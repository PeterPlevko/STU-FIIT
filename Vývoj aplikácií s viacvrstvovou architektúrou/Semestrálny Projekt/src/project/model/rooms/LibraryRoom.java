package project.model.rooms;

import project.model.CustomImage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class LibraryRoom implements Serializable {
    private final int id;
    private final String name;
    private final int capacity;
    private List<CustomImage> images;

    public LibraryRoom(int id, String name, int capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.images = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public List<CustomImage> getImages() {
        return new ArrayList<>(images);
    }

    public List<CustomImage> getRealImages() {
        return images;
    }

    public void setImages(List<CustomImage> images) {
        this.images = new ArrayList<>(images);
    }

    public void addImage(CustomImage image){
        images.add(image);
    }

    public String toString(){
        return this.name;
    }

    public Object clone(){
        LibraryRoom room = new LibraryRoom(this.id, this.name, this.capacity);
        room.setImages(images);
        return room;
    }
}
