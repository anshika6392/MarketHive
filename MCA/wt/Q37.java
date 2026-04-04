class PriorityThread extends Thread {
    PriorityThread(String name) {
        super(name);
    }

    public void run() {
        System.out.println(getName() + " priority: " + getPriority() + " running.");
    }
}

public class Q37 {
    public static void main(String[] args) {
        PriorityThread t1 = new PriorityThread("Low Priority");
        PriorityThread t2 = new PriorityThread("Normal Priority");
        PriorityThread t3 = new PriorityThread("High Priority");

        t1.setPriority(Thread.MIN_PRIORITY);  // 1
        t2.setPriority(Thread.NORM_PRIORITY); // 5
        t3.setPriority(Thread.MAX_PRIORITY);  // 10

        t1.start(); t2.start(); t3.start();
    }
}
