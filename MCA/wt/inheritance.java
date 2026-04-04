class Animal {
    String name = "Animal";
    void eat() {
        System.out.println(name + " is eating.");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking.");
    }
}

public class inheritance {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.name = "Dog";
        d.eat();
        d.bark();
    }
}
