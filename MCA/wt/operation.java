
public class operation {
    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{5, 6}, {7, 8}};
        int[][] sum = new int[2][2];
        int[][] mul = new int[2][2];

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                sum[i][j] = a[i][j] + b[i][j];
            }
        }

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    mul[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        System.out.println("Addition Result:");
        for (int[] row : sum) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }
        System.out.println("Multiplication Result:");
        for (int[] row : mul) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }
    }
}

