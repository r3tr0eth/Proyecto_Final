package modelo.bean;

public class Genero {

	private int id;
	private String nombre;

	public Genero() {
		super();
	}

	public Genero(int id, String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String toString() {
		return "Genero [id=" + id + ", nombre=" + nombre + "]";
	}

}