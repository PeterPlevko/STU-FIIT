package project.controller.readerControllers.EventsCalendar;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.TextArea;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import project.controller.Main;
import project.model.events.Message;
import java.io.IOException;

public class MessageController extends ListCell<Message> {
    @FXML private Label label;
    @FXML private TextArea textArea;
    @FXML private HBox hBox;
    @FXML private VBox vBox;
    @FXML private FXMLLoader mLLoader;

    @Override
    protected void updateItem(Message message, boolean empty) {
        super.updateItem(message, empty);
        super.setPrefWidth(670);
        if (empty || message == null) {
            setText(null);
            setGraphic(null);
        } else {
            if (mLLoader == null) {
                mLLoader = new FXMLLoader(getClass().getResource("/project/view/readerViews/EventsCalendar/MessageView.fxml"));
                mLLoader.setController(this);
                try {
                    mLLoader.load();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            label.setText(message.getUserName());
            textArea.setText(message.getText());

            Text helper = new Text();
            helper.setText(message.getText());
            helper.setFont(textArea.getFont());
            helper.setWrappingWidth(473);
            double areaHeight = helper.getLayoutBounds().getHeight() * 1.07 + 20;
            int height = 23 + (int) areaHeight;

            textArea.setPrefHeight(areaHeight);
            hBox.setPrefHeight(height);
            vBox.setPrefHeight(height);

            if(message.getUserName().equals(Main.currUser.getUserName())){
                hBox.setAlignment(Pos.TOP_RIGHT);
                vBox.setAlignment(Pos.TOP_RIGHT);
                textArea.setStyle("-fx-control-inner-background: #0055a0; -fx-text-fill: #ffffff;");
            }
            else {
                hBox.setAlignment(Pos.TOP_LEFT);
                vBox.setAlignment(Pos.TOP_LEFT);
                textArea.setStyle("-fx-control-inner-background: #ffffff; -fx-text-fill: #000000;");
            }

            setText(null);
            setGraphic(vBox);
        }
    }
}
