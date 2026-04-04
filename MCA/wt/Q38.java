class GenericBox<T> {
    private T value;

    GenericBox(T value) { this.value = value; }

    T getValue() { return value; }

    void display() {
        System.out.println("Value: " + value + " | Type: " + value.getClass().getName());
    }
}

class GenericPair<K, V> {
    K key; V val;
    GenericPair(K key, V val) { this.key = key; this.val = val; }
    void display() { System.out.println("Key: " + key + ", Value: " + val); }
}

public class Q38 {
    static <T extends Comparable<T>> T findMax(T a, T b) {
        return (a.compareTo(b) > 0) ? a : b;
    }

    public static void main(String[] args) {
        GenericBox<Integer> intBox = new GenericBox<>(42);
        GenericBox<String> strBox = new GenericBox<>("Java");
        intBox.display();
        strBox.display();

        GenericPair<String, Integer> pair = new GenericPair<>("Roll No", 31);
        pair.display();

        System.out.println("Max(10, 20): " + findMax(10, 20));
        System.out.println("Max(Apple, Mango): " + findMax("Apple", "Mango"));
    }
}
