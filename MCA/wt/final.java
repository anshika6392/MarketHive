public class Final {
    final int MAX = 100;

    final void display() {
        System.out.println("Final method called.");
        System.out.println("Final variable MAX = " + MAX);
    }

    public static void main(String[] args) {
        Main obj = new Main();
        obj.display();
    }
}
