package br.com.recyclehub.model;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Endereco")
@Data
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "END_ID")
    private Long id;

    @Column(name = "END_UF", nullable = false, length = 2)
    private String uf;

    @Column(name = "END_CIDADE", nullable = false, length = 255)
    private String cidade;

    @Column(name = "END_RUA", nullable = false, length = 255)
    private String logradouro;

    @Column(name = "END_NUMERO", nullable = false)
    private int numero;

    @Column(name = "END_COMPLEMENTO", length = 255)
    private String complemento;

    @ManyToOne
    @JoinColumn(name = "EMP_CNPJ", referencedColumnName = "EMP_CNPJ")
    private Empresa empresa;

    //Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}