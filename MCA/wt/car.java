
public class Car {
    String brand;
    int speed;

    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }

    void showInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Speed: " + speed + " km/h");
    }

	public static void main(String[] args) {
        	Car myCar = new Car("BMW", 220);
        	myCar.showInfo();
    	}
}


