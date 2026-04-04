import java.awt.*;
import java.awt.event.*;

public class Q39 extends Frame implements ActionListener, MouseListener, KeyListener {

    Label label;
    Button btn;
    TextField tf;

    Q39() {
        setLayout(new FlowLayout());
        label = new Label("Event Handling Demo");
        btn = new Button("Click Me");
        tf = new TextField(20);

        btn.addActionListener(this);
        addMouseListener(this);
        tf.addKeyListener(this);

        add(label); add(btn); add(tf);
        setSize(400, 200);
        setTitle("Event Handling");
        setVisible(true);

        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { dispose(); }
        });
    }

    public void actionPerformed(ActionEvent e) {
        label.setText("Button Clicked!");
    }

    public void mouseClicked(MouseEvent e) {
        label.setText("Mouse Clicked at (" + e.getX() + "," + e.getY() + ")");
    }

    public void mouseEntered(MouseEvent e) {}
    public void mouseExited(MouseEvent e) {}
    public void mousePressed(MouseEvent e) {}
    public void mouseReleased(MouseEvent e) {}

    public void keyTyped(KeyEvent e) {
        label.setText("Key Typed: " + e.getKeyChar());
    }

    public void keyPressed(KeyEvent e) {}
    public void keyReleased(KeyEvent e) {}

    public static void main(String[] args) {
        new Q39();
    }
}
