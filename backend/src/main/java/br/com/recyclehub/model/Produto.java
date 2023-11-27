package br.com.recyclehub.model;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Produto")
@Data
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROD_ID")
    private Long id;

    @Column(name = "PROD_NOME", nullable = false)
    private String nome;

    @Column(name = "PROD_PRECO", nullable = false)
    private Double preco;

    @Column(name = "UNIDADE_MEDIDA", nullable = false)
    private String unidadeMedida;

    @Column(name = "PROD_DESCRICAO", length = 255)
    private String descricao;

    @Column(name = "STATUS_ANUNCIO", nullable = false, length = 10)
    private String statusAnuncio;

    @Column(name = "PROD_IMG", length = 255)
    private String imagem;

    @Column(name = "VISUALIZACOES", nullable = false)
    private Integer visualizacoes = 0;

    @Column(name = "EMP_CNPJ", nullable = false)
    private String empresaCnpj;

    @ManyToOne
    @JoinColumn(name = "EMP_CNPJ", insertable = false, updatable = false)
    private Empresa empresa;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and setter for nome
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter and setter for preco
    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    // Getter and setter for unidadeMedida
    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    // Getter and setter for descricao
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    // Getter and setter for statusAnuncio
    public String getStatusAnuncio() {
        return statusAnuncio;
    }

    public void setStatusAnuncio(String statusAnuncio) {
        this.statusAnuncio = statusAnuncio;
    }

    // Getter and setter for imagem
    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    // Getter and setter for visualizacoes
    public Integer getVisualizacoes() {
        return visualizacoes;
    }

    public void setVisualizacoes(Integer visualizacoes) {
        this.visualizacoes = visualizacoes;
    }

    // Getter and setter for empresaCnpj
    public String getEmpresaCnpj() {
        return empresaCnpj;
    }

    public void setEmpresaCnpj(String empresaCnpj) {
        this.empresaCnpj = empresaCnpj;
    }

    // Getter and setter for empresa
    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}
