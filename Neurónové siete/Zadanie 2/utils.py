import os
from PIL import Image

def resize_data(dir, output_dir, size: tuple):
    
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith(".png"):
                image_path = os.path.join(root, file)
                with Image.open(image_path) as img:
                    downsampled_img = img.resize(size)
                    downsampled_image_path = os.path.join(str(root).replace(dir, output_dir))

                    if not os.path.exists(downsampled_image_path):
                        os.makedirs(downsampled_image_path)

                    #downsampled_img = downsampled_img.convert("RGB")
                    downsampled_img.save(os.path.join(downsampled_image_path, file))


resize_data("data/original", "data/processed", (112, 112))
