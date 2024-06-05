from keras import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D,ReLU, BatchNormalization, Rescaling, Dropout, Input,GaussianNoise,LeakyReLU,Add

ARCH_MAP = {
    "input": Input,
    "rescaling" : Rescaling,
    "conv": Conv2D,
    "dropout" : Dropout,
    "gaussian" :GaussianNoise,
    "maxpooling": MaxPooling2D,
    "batch_norm": BatchNormalization,
    "flatten": Flatten,
    "dense": Dense,
    "relu": ReLU,
    "leaky_relu": LeakyReLU,
    "add": Add
}
PARAMETERS = {
    "inputX": 112,
    "inputY": 112,
}

def build_model(arch: list[tuple]):
    model = Sequential()
    for layer, args, kwargs in arch:
        model.add(ARCH_MAP[layer](*args, **kwargs))

    return model

FIRST_MODEL = ("3convrelupool", [
  ("conv", [16, 3], {"padding":"same","input_shape": (112, 112, 3)}),
  ("maxpooling", [], {}),
  ("relu", [], {}),

  ("conv", [32, 3], {"padding":"same"}),
  ("maxpooling", [], {}),
  ("relu", [], {}),

  ("conv", [64, 3], {"padding":"same"}),
  ("maxpooling", [], {}),
  ("relu", [], {}),

  ("flatten", [], {}),
  ("dense", [128], {}),
  ("dense", [15], {"activation": "softmax"}),
])
#
# WITH_DROPOUT_RESCALE_MODEL = ("with_dropout_rescale", [
#   ("rescaling",[],{"scale":(1./255),"input_shape": (112, 112, 3)}),
#   ("conv", [32, 3], {"padding":"same","strides":(2,2), "activation": "relu"}),
#   ("maxpooling", [2, 2], {}),
#
#   ("conv", [64, 3], {"padding":"same","strides":(2,2), "activation": "relu"}),
#   ("maxpooling", [2, 2], {}),
#
#   ("conv", [128, 3], {"padding":"same","strides":(2,2), "activation": "relu"}),
#   ("maxpooling", [2, 2], {}),
#
#   ("flatten", [], {}),
#
#   ("dense", [128], {"activation": "relu"}),
#   ("dropout",[],{"rate":0.5}),
#   ("dense", [64], {"activation": "relu"}),
#   ("dropout",[],{"rate":0.5}),
#   ("dense", [15], {'activation': 'softmax'})
# ])
#
# WITH_DROPOUT_MODEL = ("with_dropout", [
#     ('conv', [32, 3], {'activation': 'relu',"input_shape": (112, 112, 3)}),
#     ('maxpooling', [2, 2], {}),
#     ('conv',  [64, 3], {'activation': 'relu'}),
#     ('maxpooling', [2, 2], {}),
#     ('conv',  [128, 3], {'activation': 'relu'}),
#     ('maxpooling', [2, 2], {}),
#     ('flatten', (), {}),
#     ('dense', [512], {'activation': 'relu'}),
#     ("dropout",[],{"rate":0.5}),
#     ("dense", [15], {'activation': 'softmax'}),
# ])
#
DOUBLECONV_MODEL = ("doubleconv", [
  ("conv", [16, 3], {"padding":"same","input_shape": (112, 112, 3)}),
  ("relu", [], {}),
  ("conv", [16, 3], {"padding":"same"}),
  ("relu", [], {}),
  ("maxpooling", [], {}),

  ("conv", [32, 3], {"padding":"same"}),
  ("relu", [], {}),
  ("conv", [32, 3], {"padding":"same"}),
  ("relu", [], {}),
  ("maxpooling", [], {}),

  ("conv", [64, 3], {"padding":"same"}),
  ("relu", [], {}),
  ("conv", [64, 3], {"padding":"same"}),
  ("relu", [], {}),
  ("maxpooling", [], {}),

  ("flatten", [], {}),
  ("dense", [128], {}),
  ("relu", [], {}),
  ("dense", [15], {"activation": "softmax"}),
])

WITH_BATCH_NORM_MODEL = ("with_batch_norm", [
  ("conv", [32, 3], {"padding":"same", "activation": "relu","input_shape": (112, 112, 3)}),
  ("batch_norm",[],{}),
  ("maxpooling", [2, 2], {}),

  ("conv", [32, 3], {"padding":"same", "activation": "relu"}),
  ("batch_norm",[],{}),
  ("maxpooling", [2, 2], {}),

  ("conv", [64, 3], {"padding":"same", "activation": "relu"}),
  ("batch_norm",[],{}),
  ("maxpooling", [2, 2], {}),

  ("conv", [32, 3], {"padding":"same", "activation": "relu"}),
  ("batch_norm",[],{}),
  ("maxpooling", [2, 2], {}),

  ("conv", [16, 3], {"padding":"same", "activation": "relu"}),
  ("batch_norm",[],{}),
  ("maxpooling", [2, 2], {}),

  ("flatten", [], {}),

  ("dense", [128], {"activation": "relu"}),
  ("dense", [64], {"activation": "relu"}),
  ("dense", [15], {'activation': 'softmax'})
])

DEEPER_DENSE_MODEL = ("deeper_dense", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [64, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("flatten", [], {}),
    ("dense", [512], {"activation": "relu"}),
    ("dense", [256], {"activation": "relu"}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [64], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

MORE_CONV_MODEL = ("more_conv", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [64, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [128, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [256, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])


SMALL_FILTERS_MODEL = ("small_filters", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 2], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [32, 2], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("conv", [64, 2], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("relu", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

LARGE_FILTERS_MODEL = ("large_filters", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 4], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 4], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 4], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

DIFF_FILTER_NUM_MODEL = ("diff_filter_num", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [12, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [24, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [48, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

LEAKY_RELU_FIRST_MODEL = ("leaky_relu_first", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("leaky_relu", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("leaky_relu", [], {}),

    ("conv", [64, 3], {"padding": "same"}),
    ("maxpooling", [], {}),
    ("leaky_relu", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"})
])
LEAKY_RELU_DOUBLECONV_MODEL = ("leaky_relu_doubleconv", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("conv", [16, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("conv", [32, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("conv", [64, 3], {"padding": "same"}),
    ("leaky_relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"})
])

RESIDUAL_BLOCK_MODEL_1 = ("residual_block_model_1", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),

    ("conv", [16, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("conv", [16, 3], {"padding": "same"}),
    ("add", [1], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("conv", [32, 3], {"padding": "same"}),
    ("add", [3], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),


    ("conv", [64, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("conv", [64, 3], {"padding": "same"}),
    ("add", [5], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])


RESIDUAL_BLOCK_MODEL_2 = ("residual_block_model_2", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same"}),

    ("conv", [16, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("relu", [], {}),
    ("conv", [16, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("add", [1], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),

    ("conv", [32, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("relu", [], {}),
    ("conv", [32, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("add", [3], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),

    ("conv", [64, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("relu", [], {}),
    ("conv", [64, 3], {"padding": "same"}),
    ("batch_norm",[],{}),
    ("add", [5], {}),
    ("relu", [], {}),

    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])


DROPOUT_LARGE_STRIDES_MODEL = ("dropout_large_strides", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 3], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 3], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 3], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dropout", [], {"rate": 0.5}),
    ("dense", [15], {"activation": "softmax"}),
])


DROPOUT_SMALL_FILTERS_MODEL = ("dropout_small_filters", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 2], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 2], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 2], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dropout", [], {"rate": 0.5}),
    ("dense", [15], {"activation": "softmax"}),
])


DROPOUT_DIFF_FILTER_NUM_MODEL = ("dropout_diff_filter_num", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [12, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [24, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [48, 3], {"padding": "same"}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dropout", [], {"rate": 0.5}),
    ("dense", [15], {"activation": "softmax"}),
])

LARGE_FILTERS_DIFF_STRIDES_MODEL = ("large_filters_diff_strides", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 4], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 4], {"padding": "same", "strides": (1, 1)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 4], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

SMALL_FILTERS_DIFF_STRIDES_MODEL = ("small_filters_diff_strides", [
    ("input", [], {"shape": (112, 112, 3)}),
    ("conv", [16, 2], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [32, 2], {"padding": "same", "strides": (1, 1)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("conv", [64, 2], {"padding": "same", "strides": (2, 2)}),
    ("relu", [], {}),
    ("maxpooling", [], {}),

    ("flatten", [], {}),
    ("dense", [128], {"activation": "relu"}),
    ("dense", [15], {"activation": "softmax"}),
])

ARCHITECTURES = [DEEPER_DENSE_MODEL,MORE_CONV_MODEL,SMALL_FILTERS_MODEL,LARGE_FILTERS_MODEL,DIFF_FILTER_NUM_MODEL,LEAKY_RELU_FIRST_MODEL,LEAKY_RELU_DOUBLECONV_MODEL,RESIDUAL_BLOCK_MODEL_1,RESIDUAL_BLOCK_MODEL_2,DROPOUT_LARGE_STRIDES_MODEL,DROPOUT_SMALL_FILTERS_MODEL,DROPOUT_DIFF_FILTER_NUM_MODEL,LARGE_FILTERS_DIFF_STRIDES_MODEL,SMALL_FILTERS_DIFF_STRIDES_MODEL]
