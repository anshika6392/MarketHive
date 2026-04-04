class Parent {
    int x = 10;
    void show() {
        System.out.println("Parent show()");
    }
}

class Child extends Parent {
    int x = 20;
    void show() {
        super.show();
        System.out.println("Parent x = " + super.x);
        System.out.println("Child x = " + x);
    }
}

public class superr {
    public static void main(String[] args) {
        Child c = new Child();
        c.show();
    }
}
