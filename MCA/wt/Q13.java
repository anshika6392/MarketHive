public class Q13 {
    public int pubVar = 1;
    protected int protVar = 2;
    int defaultVar = 3;
    private int privVar = 4;

    void show() {
        System.out.println("Public: " + pubVar);
        System.out.println("Protected: " + protVar);
        System.out.println("Default: " + defaultVar);
        System.out.println("Private: " + privVar);
    }

    public static void main(String[] args) {
        Q13 obj = new Q13();
        obj.show();
    }
}
