package br.com.recyclehub.model;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Categoria")
@Data
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CATEGORIA_ID")
    private Long id;

    @Column(name = "CATEGORIA_NOME", nullable = false, length = 255)
    private String nome;

    //Getters e Setters:
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

