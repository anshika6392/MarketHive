class Thread1 extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println("Thread 1 - Count: " + i);
    }
}

class Thread2 extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println("Thread 2 - Count: " + i);
    }
}

class Thread3 extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println("Thread 3 - Count: " + i);
    }
}

public class Q35 {
    public static void main(String[] args) {
        Thread1 t1 = new Thread1();
        Thread2 t2 = new Thread2();
        Thread3 t3 = new Thread3();
        t1.start();
        t2.start();
        t3.start();
    }
}

