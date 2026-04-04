abstract class main {
    abstract double area();
    void display() {
        System.out.println("Area = " + area());
    }
}
class Circle extends main {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }
}
class Rectangle extends main {
    double l, w;
    Rectangle(double l, double w) { this.l = l; this.w = w; }
    double area() { return l * w; }
}
public class inherit {
    public static void main(String[] args) {
        main s1 = new Circle(5);
        main s2 = new Rectangle(4, 6);
        s1.display();
        s2.display();
    }
}
