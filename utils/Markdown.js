class Markdown {
  constructor(){
    this.value = ``
  }
  h1(text){
    this.value += `

# ${text}
`
    return this
  }
  h2(text){
    this.value += `

## ${text}
`
    return this
  }
  h3(text){
    this.value += `

### ${text}
`
    return this
  }
  list(text){
    this.value += `
* ${text}
`
    return this
  }
  image(text,url){
    this.value += `
![${text}](${url})
`
  }
  text(text){
    this.value += `
${text}
`
    return this
  }
  code(text, lang=""){
    this.value += `
\`\`\`${lang}
${text}
\`\`\`
`
    return this
  }
}

module.exports = Markdown
