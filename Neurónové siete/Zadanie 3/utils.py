from collections import defaultdict
import numpy as np
import skimage.io as io
from PIL import Image
import cv2
from pycocotools.coco import COCO
import json
import math
import matplotlib.pyplot as plt 
import os
from tensorflow import keras
import tensorflow as tf
from keras import layers, losses
import io
import random

# get all images containing given categories
def transform_data(directory, data_type):
    annFile = '{}/annotations/person_keypoints_{}.json'.format(directory, data_type)
    data = COCO(annFile)

    catIds = data.getCatIds(catNms=['person'])
    imgIds = data.getImgIds(catIds=catIds)
    transformed_images = []
    transformed_keypoints = []

    # loop over all the images
    for i, imgId in enumerate(imgIds):

        # load image
        img_info = data.loadImgs(imgId)[0]
        img_path = "{}/{}/{}".format(directory, data_type, img_info['file_name'])
        img = cv2.imread(img_path)

        # load annotations for the image
        annIds = data.getAnnIds(imgIds=imgId, catIds=catIds, iscrowd=None)
        anns = data.loadAnns(annIds)

        # loop over all the annotations
        for ann in anns:
            # check if the annotation meets the criteria
            if ann["num_keypoints"] >= 9:
                x_max = max([ann["keypoints"][idx] for idx in range(0, len(ann["keypoints"]), 3)])
                x_min = min([ann["keypoints"][idx] for idx in range(0, len(ann["keypoints"]), 3) if ann["keypoints"][idx] > 0])
                y_max = max([ann["keypoints"][idx] for idx in range(1, len(ann["keypoints"]), 3)])
                y_min = min([ann["keypoints"][idx] for idx in range(1, len(ann["keypoints"]), 3) if ann["keypoints"][idx] > 0])

                if (x_max - x_min < 224 and y_max - y_min < 224):

                    pad_x = 224 - (x_max - x_min)
                    x_max = x_max + (pad_x // 2)
                    x_min = x_min - (pad_x // 2)

                    if x_max == 223:
                        x_max+=1
                    if x_min == 223:
                        x_min+=1

                    pad_y = 224 - (y_max - y_min)
                    y_max = y_max + (pad_y // 2)
                    y_min = y_min - (pad_y // 2)
                    if y_max == 223:
                        y_max+=1
                    if y_min == 223:
                        y_min+=1

                    y_min = max(0, y_min)
                    y_max = min(img.shape[0], y_max)
                    x_min = max(0, x_min)
                    x_max = min(img.shape[1], x_max)

                    x_offset = 0
                    y_offset = 0

                    cropped_img = img[y_min:y_max, x_min:x_max]
                    if cropped_img.shape != (224,224,3):  # if we need padding (person was in the corner of image for example)

                        black_img = np.zeros((224, 224, 3), dtype=np.uint8)
                        x_offset = (224 - cropped_img.shape[1]) // 2
                        y_offset = (224 - cropped_img.shape[0]) // 2

                        black_img[y_offset:y_offset+cropped_img.shape[0], x_offset:x_offset+cropped_img.shape[1]] = cropped_img
                        transformed_images.append(black_img)
                    else:
                        transformed_images.append(cropped_img)

                    keypoints = []

                    # loop over all the keypoints
                    for idx in range(0, len(ann["keypoints"]), 3):
                        # update the x and y coordinates of the keypoint
                        new_x = ann["keypoints"][idx]
                        new_y = ann["keypoints"][idx+1]
                        new_vis = ann["keypoints"][idx+2]
                        
                        if ann["keypoints"][idx] > 0:
                            new_x += -x_min + x_offset
                        if ann["keypoints"][idx+1] > 0:
                            new_y += -y_min + y_offset
                        
                        keypoints.append(1 if new_vis > 0 else 0)
                        keypoints.append(new_x)
                        keypoints.append(new_y)
                        
                    transformed_keypoints.append(keypoints)

    formatted_kps = []
    os.makedirs(f"{directory}/{data_type}_edited/",exist_ok=True)
    for idx, (image, keypoints) in enumerate(zip(transformed_images, transformed_keypoints)):
        image = image[:, :, ::-1] # swap the red and blue channels
        cv2.imwrite(f"{directory}/{data_type}_edited/{str(idx).zfill(6)}.jpg", image)
        formatted_kps.append({
            "keypoints": keypoints,
            "img_name": f"{str(idx).zfill(6)}.jpg",
        })

    with open(f"{directory}/annotations/person_keypoints_{data_type}_edited.json", 'w') as f:
        json.dump(formatted_kps, f)

    print(f"Produced {idx} images.")


def load_images_labels(directory, data_type):

    images = []
    labels = []
    annFile = '{}/annotations/person_keypoints_{}_edited.json'.format(directory, data_type)

    with open(annFile, "r") as f:
        kps = json.load(f)

    for kp in kps:
        labels.append(kp["keypoints"])
        filename = kp["img_name"]
        img = cv2.imread(f"{directory}/{data_type}_edited/{filename}")
        img_arr = np.array(img)
        images.append(img_arr)

    return np.stack(images), np.stack(labels)


def plot_cut_images(data, keypoints_true=None, keypoints_pred=None, num_images=20):
    num_rows = int(math.sqrt(num_images)) + 1
    num_cols = int(math.ceil(num_images / num_rows))
    plt.cla()
    plt.clf()
    fig, axs = plt.subplots(num_rows, num_cols, figsize=(18,18))

    for i in range(num_images):
        row = i // num_cols
        col = i % num_cols
        axs[row][col].imshow(data[i])

        # plot the keypoints
        if keypoints_pred is not None:
            for j in range(0, len(keypoints_pred[i]), 3):

                if keypoints_pred[i][j] > 0:
                    axs[row][col].scatter(int(keypoints_pred[i][j + 1]), int(keypoints_pred[i][j + 2]), s=10, marker='.', color='red')

        if keypoints_true is not None:
            for j in range(0, len(keypoints_true[i]), 3):

                if keypoints_true[i][j] > 0:
                    axs[row][col].scatter(int(keypoints_true[i][j + 1]), int(keypoints_true[i][j + 2]), s=10, marker='.', color='blue')

        axs[row][col].axis('off')

    plt.show()

def plot_pred_images(data, keypoints_true=None, keypoints_pred=None, num_images=20, scaled=False):
    num_cols = 4
    num_rows = num_images // num_cols

    if num_images % 4 != 0:
        raise ValueError("Number of images must be divisible by 4!")
    
    multiplier = 224 if scaled else 1

    plt.cla()
    plt.clf()
    fig, axs = plt.subplots(num_rows, num_cols, figsize=(18,18))

    for i in range(num_images):
        row = i // num_cols
        col = i % num_cols
        axs[row][col].imshow(data[i])

        # plot the keypoints
        if keypoints_pred is not None:
            vis, kps = keypoints_pred[0][i], keypoints_pred[1][i]
            kps *= multiplier
            for j in range(0, len(kps), 2):
                
                if vis[j // 2] > 0:
                    axs[row][col].scatter(int(kps[j]), int(kps[j + 1]), s=10, marker='.', color='red')

        if keypoints_true is not None:
            vis, kps = keypoints_true[0][i], keypoints_true[1][i]
            kps *= multiplier
            for j in range(0, len(kps), 2):

                if vis[j // 2] > 0:
                    axs[row][col].scatter(int(kps[j]), int(kps[j + 1]), s=10, marker='.', color='blue')

        axs[row][col].axis('off')

    io_buf = io.BytesIO()
    fig.savefig(io_buf, format='raw')
    io_buf.seek(0)
    img_arr = np.reshape(np.frombuffer(io_buf.getvalue(), dtype=np.uint8),
                        newshape=(int(fig.bbox.bounds[3]), int(fig.bbox.bounds[2]), -1))
    
    io_buf.close()
    plt.show()
    return img_arr


def flip(inputs):
    print(inputs.shape)
    inputs = tf.image.flip_left_right(inputs) # flip image
    mask = tf.constant([True, False] * 17, dtype=tf.bool) # take x and y value

    kps = tf.boolean_mask(inputs, mask, axis=1)
    x_kps = tf.boolean_mask(kps, mask)



    return inputs


class RandomAugmentLayer(layers.Layer):

    def call(self, inputs):

        prob = tf.random.normal([1])

        inputs = tf.cond(prob > 0.5, lambda: tf.map_fn(flip, inputs), lambda: inputs)
        
        return inputs
    

class VisibilityThresholdLayer(layers.Layer):

    def call(self, inputs):

        inputs = tf.where(inputs < 0.5, tf.zeros_like(inputs), inputs)
        inputs = tf.where(inputs >= 0.5, tf.ones_like(inputs), inputs)
        
        return inputs
    
class KeypointNullifyLayer(layers.Layer):

    def call(self, inputs, visibility):

        vis = tf.repeat(visibility, repeats=2, axis=1)
        
        kps = tf.multiply(inputs, vis)
        return kps


class BCEMSELoss(losses.Loss):
    def __init__(self, num_joints):
        super().__init__()
        self.num_joints = num_joints
        self.mse = losses.MeanSquaredError()
        self.bce = losses.BinaryCrossentropy()

    def call(self, y_true, y_pred):
        
        mask = tf.constant([False, True, True] * 17, dtype=tf.bool) # take x and y value

        true_kps = tf.boolean_mask(y_true, mask, axis=1)
        #tf.print(tf.shape(true_kps), true_kps[0][:6])
        pred_kps = tf.boolean_mask(y_pred, mask, axis=1)
        #tf.print(tf.shape(pred_kps), pred_kps[0][:6])

        #kp_loss = tf.multiply(0.7, self.mse(true_kps, pred_kps))
        kp_loss = self.mse(true_kps, pred_kps)

        #vis_loss = tf.multiply(0.3, self.bce(y_true[:, ::3], y_pred[:, ::3]))
        vis_loss = self.bce(y_true[:, ::3], y_pred[:, ::3])
        
        loss = tf.add(kp_loss, vis_loss)
        return tf.cast(loss, tf.float32)


def get_model(x, img_size, num_keypoints):
    # Load the pre-trained weights of MobileNetV2 and freeze the weights
    backbone = keras.applications.MobileNetV2(
        weights="imagenet", include_top=False, input_shape=(img_size, img_size, 3)
    )
    backbone.trainable = False

    x = keras.applications.mobilenet_v2.preprocess_input(x)
    x = backbone(x)
    x = layers.Dropout(0.3)(x)
    x = layers.SeparableConv2D(num_keypoints * 3, kernel_size=3, strides=1, activation="relu")(x)
    x = layers.Flatten()(x)

    x = layers.Dropout(0.3)(x)
    x = layers.Dense(units=num_keypoints * 3, name='fc3')(x) # keypoints x3

    return x

def get_modelv2(x, img_size, num_keypoints):
    # Load the pre-trained weights of MobileNetV2 and freeze the weights
    backbone = keras.applications.MobileNetV2(
        weights="imagenet", include_top=False, input_shape=(img_size, img_size, 3)
    )
    backbone.trainable = False

    #x = RandomAugmentLayer()(x)
    x = keras.applications.mobilenet_v2.preprocess_input(x)
    x = backbone(x)
    x = layers.Dropout(0.3)(x)
    x = layers.SeparableConv2D(num_keypoints * 3, kernel_size=3, strides=1, activation="relu")(x)
    x = layers.Flatten()(x)

    #x = layers.Dropout(0.3)(x)
    #x = layers.Dense(units=num_keypoints * 3, name='fc3')(x) # keypoints x3
    x = layers.BatchNormalization()(x)
    kp_out = layers.Dense(units=num_keypoints * 2, name='kp_out_dense')(x) # keypoints x2

    vis_out = layers.Dense(units=num_keypoints, activation="sigmoid")(x) # 
    vis_out = VisibilityThresholdLayer(name='vis_out')(vis_out)

    kp_out = KeypointNullifyLayer(name="kp_out")(kp_out, vis_out)

    return vis_out, kp_out
