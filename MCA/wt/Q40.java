import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Q40 extends JFrame implements ActionListener {

    JLabel nameLabel, rollLabel, genderLabel, courseLabel, addressLabel;
    JTextField nameField, rollField;
    JRadioButton male, female;
    ButtonGroup genderGroup;
    JCheckBox java, python, cpp;
    JTextArea addressArea;
    JButton submit, clear;
    JTextArea output;

    Q40() {
        setTitle("Student Registration Form");
        setSize(500, 600);
        setLayout(new GridLayout(0, 2, 5, 5));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        nameLabel = new JLabel("Name:");
        nameField = new JTextField();
        rollLabel = new JLabel("Roll No:");
        rollField = new JTextField();
        genderLabel = new JLabel("Gender:");
        male = new JRadioButton("Male");
        female = new JRadioButton("Female");
        genderGroup = new ButtonGroup();
        genderGroup.add(male); genderGroup.add(female);
        JPanel genderPanel = new JPanel();
        genderPanel.add(male); genderPanel.add(female);
        courseLabel = new JLabel("Courses:");
        java = new JCheckBox("Java");
        python = new JCheckBox("Python");
        cpp = new JCheckBox("C++");
        JPanel coursePanel = new JPanel();
        coursePanel.add(java); coursePanel.add(python); coursePanel.add(cpp);
        addressLabel = new JLabel("Address:");
        addressArea = new JTextArea(3, 20);
        submit = new JButton("Submit");
        clear = new JButton("Clear");
        output = new JTextArea(5, 30);
        output.setEditable(false);

        submit.addActionListener(this);
        clear.addActionListener(this);

        add(nameLabel); add(nameField);
        add(rollLabel); add(rollField);
        add(genderLabel); add(genderPanel);
        add(courseLabel); add(coursePanel);
        add(addressLabel); add(new JScrollPane(addressArea));
        add(submit); add(clear);
        add(new JLabel("Output:")); add(new JScrollPane(output));

        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == submit) {
            String gender = male.isSelected() ? "Male" : female.isSelected() ? "Female" : "Not selected";
            String courses = (java.isSelected() ? "Java " : "") +
                             (python.isSelected() ? "Python " : "") +
                             (cpp.isSelected() ? "C++ " : "");
            output.setText("Name: " + nameField.getText() + "\n" +
                           "Roll No: " + rollField.getText() + "\n" +
                           "Gender: " + gender + "\n" +
                           "Courses: " + courses + "\n" +
                           "Address: " + addressArea.getText());
        } else {
            nameField.setText(""); rollField.setText("");
            genderGroup.clearSelection();
            java.setSelected(false); python.setSelected(false); cpp.setSelected(false);
            addressArea.setText(""); output.setText("");
        }
    }

    public static void main(String[] args) {
        new Q40();
    }
}
