class Address implements Cloneable {
    String city;
    Address(String city) { this.city = city; }
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
class Student implements Cloneable {
    String name;
    Address addr;
    Student(String name, Address addr) {
        this.name = name; this.addr = addr;
    }
    
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    
    Student deepClone() throws CloneNotSupportedException {
        Student s = (Student) super.clone();
        s.addr = (Address) addr.clone();
        return s;
    }
}

public class cloning {
    public static void main(String[] args) throws CloneNotSupportedException {
        Address a = new Address("Delhi");
        Student s1 = new Student("Manu", a);
        Student s2 = (Student) s1.clone();
        Student s3 = s1.deepClone();

        s2.addr.city = "Mumbai";
        System.out.println("Shallow - s1 city: " + s1.addr.city);
        System.out.println("Shallow - s2 city: " + s2.addr.city);

        s3.addr.city = "Noida";
        System.out.println("Deep - s1 city: " + s1.addr.city);
        System.out.println("Deep - s3 city: " + s3.addr.city);
    }
}
