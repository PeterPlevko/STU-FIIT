package project.model;

import javafx.embed.swing.SwingFXUtils;
import javafx.scene.image.Image;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class CustomImage implements Serializable {
    private transient Image image;

    public CustomImage(Image image) {
        this.image = image;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {
        s.defaultReadObject();
        image = SwingFXUtils.toFXImage(ImageIO.read(s), null);
    }

    private void writeObject(ObjectOutputStream s) throws IOException {
        s.defaultWriteObject();
        ImageIO.write(SwingFXUtils.fromFXImage(image, null), "png", s);
    }
}
