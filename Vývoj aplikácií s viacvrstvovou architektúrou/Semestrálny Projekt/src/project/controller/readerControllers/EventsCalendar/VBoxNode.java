package project.controller.readerControllers.EventsCalendar;

import javafx.scene.Node;
import javafx.scene.layout.VBox;
import java.time.LocalDate;

public class VBoxNode extends VBox {
    private LocalDate date;

    public VBoxNode(Node... children) {
        super(children);
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
