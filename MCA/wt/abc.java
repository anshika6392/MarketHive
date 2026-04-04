public class abc {
    int a, b, c;
    abc() {
        this(1, 2);
        System.out.println("No-arg constructor");
    }
    abc(int a, int b) {
        this(a, b, 0);
        System.out.println("Two-arg constructor");
    }
    abc(int a, int b, int c) {
        this.a = a; this.b = b; this.c = c;
        System.out.println("Three-arg: a=" + a + " b=" + b + " c=" + c);
    }
    public static void main(String[] args) {
        new abc();
    }
}
