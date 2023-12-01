package br.com.recyclehub.model;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Mensagem")
@Data
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MSG_ID")
    private Long id;

    @Column(name = "MSG_EMAIL", nullable = false, length = 255)
    private String email;

    @Column(name = "MSG_NOME", nullable = false, length = 255)
    private String nome;

    @Column(name = "MSG_CONTEUDO", nullable = false, length = 1000)
    private String conteudo;

    @Column(name = "MSG_TELEFONE", nullable = false, length = 20)
    private String telefone;

    @Column(name = "STATUS_MENSAGEM", nullable = false, length = 20)
    private String statusMensagem;

    @ManyToOne
    @JoinColumn(name = "PROD_ID", insertable = false, updatable = false)
    private Produto produto;

    //Getters e Setters:
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getStatusMensagem() {
        return statusMensagem;
    }

    public void setStatusMensagem(String statusMensagem) {
        this.statusMensagem = statusMensagem;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
