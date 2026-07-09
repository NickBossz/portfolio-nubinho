# Publicar na Vercel

Este projeto esta preparado para deploy na Vercel usando Nitro com preset `vercel`.

## Configuracao na Vercel

1. Importe o repositorio `NickBossz/portfolio-nubinho` na Vercel.
2. Use as configuracoes padrao do projeto.
3. Confirme estes comandos:
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: deixe vazio
4. Faca o deploy.

O build gera a saida no formato Build Output API da Vercel:

```text
.vercel/output
```

A pasta `.vercel/` e gerada localmente pelo build e nao deve ser commitada.

## Admin

Depois de publicado, o painel fica em:

```text
https://SEU-DOMINIO/admin/index.html
```

O painel Decap abre nessa rota, mas para salvar alteracoes no GitHub ele ainda
precisa de autenticacao OAuth configurada para o backend GitHub.

## Conteudo

Os projetos ficam em:

```text
src/content/projects/
```

O site carrega automaticamente todos os arquivos `.json` dessa pasta via
`import.meta.glob`.
