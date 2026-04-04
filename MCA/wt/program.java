public class  program{
    class Inner {
        void show() { System.out.println("Regular Inner Class"); }
    }
    static class StaticNested {
        void show() { System.out.println("Static Nested Class"); }
    }

    void methodWithLocalClass() {
        class Local {
            void show() { System.out.println("Local Inner Class"); }
        }
        new Local().show();
    }

    public static void main(String[] args) {
        program outer = new program();
        outer.new Inner().show();
        new StaticNested().show();

        
        outer.methodWithLocalClass();

        
        Runnable r = new Runnable() {
            public void run() { System.out.println("Anonymous Inner Class"); }
        };
        r.run();
    }
}
