package ItProfesia.Firms;

import javafx.scene.image.ImageView;

public class CustomImage {

    private ImageView image;

    public CustomImage(ImageView img) {
        this.image = img;
    }

    public void setImage(ImageView value) {
        image = value;
    }

    public ImageView getImage() {
        return image;
    }
}