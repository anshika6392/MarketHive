public class Q10 {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        Q10 obj = new Q10();
        System.out.println("Sum(int): " + obj.add(5, 10));
        System.out.println("Sum(double): " + obj.add(2.5, 3.5));
        System.out.println("Sum(3 ints): " + obj.add(1, 2, 3));
    }
}
