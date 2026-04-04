public class copy {
    public static void main(String[] args) {
        int[] src = {1, 2, 3, 4, 5};
        int[] dest = new int[src.length];
        for (int i = 0; i < src.length; i++) {
            dest[i] = src[i];
        }
        System.out.print("Copied array: ");
        for (int x : dest) {
            System.out.print(x + " ");
        }
    }
}

