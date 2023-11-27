package br.com.recyclehub.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "Empresa")
@Data
public class Empresa {
    
    @Id
    @Column(name = "EMP_CNPJ", length = 14)
    private long cnpj;

    @Column(name = "EMP_NOME", length = 100)
    private String nome;

    @Column(name = "EMP_SENHA", length = 255)
    private String senha;

    @Column(name = "EMP_EMAIL", length = 255)
    private String email;

    @Column(name = "EMP_CEP", length = 8)
    private String cep;

    @Column(name = "EMP_TELEFONE", length = 20)
    private String telefone;

    @Column(name = "EMP_CELULAR", length = 20)
    private String celular;

    @Column(name = "EMP_DESCRICAO", length = 255)
    private String descricao;

    @Column(name = "EMP_STATUS", length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'Não aprovada'")
    private String status;

    @Column(name = "EMP_IMG", length = 255)
    private String img;

    // Getters
    public long getCnpj() {
        return cnpj;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public String getEmail() {
        return email;
    }

    public String getCep() {
        return cep;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCelular() {
        return celular;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getStatus() {
        return status;
    }

    public String getImg() {
        return img;
    }

    // Setters

    public void setCnpj(long cnpj) {
        this.cnpj = cnpj;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setImg(String img) {
        this.img = img;
    }
}