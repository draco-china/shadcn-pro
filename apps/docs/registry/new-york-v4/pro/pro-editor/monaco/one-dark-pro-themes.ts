// One Dark Pro Flat — dark and derived light variant
// Dark token colors sourced from github.com/Binaryify/OneDark-Pro (MIT)
// Light variant derived by mapping dark palette → Atom One Light equivalents
// Chrome colors (bg, widgets, scrollbar) are intentionally omitted here —
// applyShadcnTheme() reads them from shadcn CSS variables at runtime.

import type { editor } from 'monaco-editor'

type MonacoThemeData = editor.IStandaloneThemeData

export const oneDarkProFlatTheme: MonacoThemeData = {
  base: 'vs-dark',
  inherit: false,
  rules: [],
  colors: {},
  tokenColors: [
  {
    "scope": "meta.embedded",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "unison punctuation",
    "scope": "punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "haskell variable generic-type",
    "scope": "variable.other.generic-type.haskell",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "haskell storage type",
    "scope": "storage.type.haskell",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "support.variable.magic.python",
    "scope": "support.variable.magic.python",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "punctuation.separator.parameters.python",
    "scope": "punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "variable.parameter.function.language.special.self.python",
    "scope": "variable.parameter.function.language.special.self.python",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "variable.parameter.function.language.special.cls.python",
    "scope": "variable.parameter.function.language.special.cls.python",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "storage.modifier.lifetime.rust",
    "scope": "storage.modifier.lifetime.rust",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "support.function.std.rust",
    "scope": "support.function.std.rust",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "entity.name.lifetime.rust",
    "scope": "entity.name.lifetime.rust",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "variable.language.rust",
    "scope": "variable.language.rust",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "support.constant.edge",
    "scope": "support.constant.edge",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "regexp constant character-class",
    "scope": "constant.other.character-class.regexp",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "keyword.operator",
    "scope": [
      "keyword.operator.word"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "regexp operator.quantifier",
    "scope": "keyword.operator.quantifier.regexp",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Text",
    "scope": "variable.parameter.function",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Comment Markup Link",
    "scope": "comment markup.link",
    "settings": {
      "foreground": "#5c6370"
    }
  },
  {
    "name": "markup diff",
    "scope": "markup.changed.diff",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "diff",
    "scope": "meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "inserted.diff",
    "scope": "markup.inserted.diff",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "deleted.diff",
    "scope": "markup.deleted.diff",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "c++ function",
    "scope": "meta.function.c,meta.function.cpp",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "c++ block",
    "scope": "punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "js/ts punctuation separator key-value",
    "scope": "punctuation.separator.key-value",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "js/ts import keyword",
    "scope": "keyword.operator.expression.import",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "math js/ts",
    "scope": "support.constant.math",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "math property js/ts",
    "scope": "support.constant.property.math",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "js/ts variable.other.constant",
    "scope": "variable.other.constant",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "java type",
    "scope": [
      "storage.type.annotation.java",
      "storage.type.object.array.java"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "java source",
    "scope": "source.java",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "meta.method.java",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "storage.modifier.import.java,storage.type.java,storage.type.generic.java",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "java instanceof",
    "scope": "keyword.operator.instanceof.java",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "java variable.name",
    "scope": "meta.definition.variable.name.java",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "operator logical",
    "scope": "keyword.operator.logical",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "operator bitwise",
    "scope": "keyword.operator.bitwise",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "operator channel",
    "scope": "keyword.operator.channel",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "support.constant.property-value.scss",
    "scope": "support.constant.property-value.scss,support.constant.property-value.css",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "CSS/SCSS/LESS Operators",
    "scope": "keyword.operator.css,keyword.operator.scss,keyword.operator.less",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "css color standard name",
    "scope": "support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "css comma",
    "scope": "punctuation.separator.list.comma.css",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "css attribute-name.id",
    "scope": "support.constant.color.w3c-standard-color-name.css",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "css property-name",
    "scope": "support.type.vendored.property-name.css",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "js/ts module",
    "scope": "support.module.node,support.type.object.module,support.module.node",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "entity.name.type.module",
    "scope": "entity.name.type.module",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "js variable readwrite",
    "scope": "variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "js/ts json",
    "scope": "support.constant.json",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "js/ts Keyword",
    "scope": [
      "keyword.operator.expression.instanceof",
      "keyword.operator.new",
      "keyword.operator.ternary",
      "keyword.operator.optional",
      "keyword.operator.expression.keyof"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "js/ts console",
    "scope": "support.type.object.console",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "js/ts support.variable.property.process",
    "scope": "support.variable.property.process",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "js console function",
    "scope": "entity.name.function,support.function.console",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "keyword.operator.misc.rust",
    "scope": "keyword.operator.misc.rust",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "keyword.operator.sigil.rust",
    "scope": "keyword.operator.sigil.rust",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "operator",
    "scope": "keyword.operator.delete",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "js dom",
    "scope": "support.type.object.dom",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "js dom variable",
    "scope": "support.variable.dom,support.variable.property.dom",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "keyword.operator",
    "scope": "keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "C operator assignment",
    "scope": "keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Punctuation",
    "scope": "punctuation.separator.delimiter",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Other punctuation .c",
    "scope": "punctuation.separator.c,punctuation.separator.cpp",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "C type posix-reserved",
    "scope": "support.type.posix-reserved.c,support.type.posix-reserved.cpp",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "keyword.operator.sizeof.c",
    "scope": "keyword.operator.sizeof.c,keyword.operator.sizeof.cpp",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "python parameter",
    "scope": "variable.parameter.function.language.python",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "python type",
    "scope": "support.type.python",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "python logical",
    "scope": "keyword.operator.logical.python",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "pyCs",
    "scope": "variable.parameter.function.python",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "python block",
    "scope": "punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "python function-call.generic",
    "scope": "meta.function-call.generic.python",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "python placeholder reset to normal string",
    "scope": "constant.character.format.placeholder.other.python",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Operators",
    "scope": "keyword.operator",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Compound Assignment Operators",
    "scope": "keyword.operator.assignment.compound",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Compound Assignment Operators js/ts",
    "scope": "keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "Keywords",
    "scope": "keyword",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Namespaces",
    "scope": "entity.name.namespace",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Variables",
    "scope": "variable",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Variables",
    "scope": "variable.c",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Language variables",
    "scope": "variable.language",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Java Variables",
    "scope": "token.variable.parameter.java",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Java Imports",
    "scope": "import.storage.java",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Packages",
    "scope": "token.package.keyword",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Packages",
    "scope": "token.package",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Functions",
    "scope": [
      "entity.name.function",
      "meta.require",
      "support.function.any-method",
      "variable.function"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Classes",
    "scope": "entity.name.type.namespace",
    "settings": {
      "foreground": "#e5c07b",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Classes",
    "scope": "support.class, entity.name.type.class",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Class name",
    "scope": "entity.name.class.identifier.namespace.type",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Class name",
    "scope": [
      "entity.name.class",
      "variable.other.class.js",
      "variable.other.class.ts"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Class name php",
    "scope": "variable.other.class.php",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Type Name",
    "scope": "entity.name.type",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Keyword Control",
    "scope": "keyword.control",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Control Elements",
    "scope": "control.elements, keyword.operator.less",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Methods",
    "scope": "keyword.other.special-method",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Storage",
    "scope": "storage",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Storage JS TS",
    "scope": "token.storage",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Source Js Keyword Operator Delete,source Js Keyword Operator In,source Js Keyword Operator Of,source Js Keyword Operator Instanceof,source Js Keyword Operator New,source Js Keyword Operator Typeof,source Js Keyword Operator Void",
    "scope": "keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Java Storage",
    "scope": "token.storage.type.java",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Support",
    "scope": "support.function",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "Support type",
    "scope": "support.type.property-name",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] toml support",
    "scope": "support.type.property-name.toml, support.type.property-name.table.toml, support.type.property-name.array.toml",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Support type",
    "scope": "support.constant.property-value",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Support type",
    "scope": "support.constant.font-name",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Meta tag",
    "scope": "meta.tag",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Strings",
    "scope": "string",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "Constant other symbol",
    "scope": "constant.other.symbol",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "Integers",
    "scope": "constant.numeric",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Constants",
    "scope": "constant",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Constants",
    "scope": "punctuation.definition.constant",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Tags",
    "scope": "entity.name.tag",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Attributes",
    "scope": "entity.other.attribute-name",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Attribute IDs",
    "scope": "entity.other.attribute-name.id",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Attribute class",
    "scope": "entity.other.attribute-name.class.css",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Selector",
    "scope": "meta.selector",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Headings",
    "scope": "markup.heading",
    "settings": {
      "foreground": "#e06c75",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Headings",
    "scope": "markup.heading punctuation.definition.heading, entity.name.section",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Units",
    "scope": "keyword.other.unit",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Bold",
    "scope": "markup.bold,todo.bold",
    "settings": {
      "foreground": "#d19a66",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Bold",
    "scope": "punctuation.definition.bold",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "markup Italic",
    "scope": "markup.italic, punctuation.definition.italic,todo.emphasis",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "emphasis md",
    "scope": "emphasis md",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown headings",
    "scope": "entity.name.section.markdown",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown heading Punctuation Definition",
    "scope": "punctuation.definition.heading.markdown",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "punctuation.definition.list.begin.markdown",
    "scope": "punctuation.definition.list.begin.markdown",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown heading setext",
    "scope": "markup.heading.setext",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition Bold",
    "scope": "punctuation.definition.bold.markdown",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw",
    "scope": "markup.inline.raw.markdown",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw",
    "scope": "markup.inline.raw.string.markdown",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw punctuation",
    "scope": "punctuation.definition.raw.markdown",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown List Punctuation Definition",
    "scope": "punctuation.definition.list.markdown",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition String",
    "scope": [
      "punctuation.definition.string.begin.markdown",
      "punctuation.definition.string.end.markdown",
      "punctuation.definition.metadata.markdown"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "beginning.punctuation.definition.list.markdown",
    "scope": [
      "beginning.punctuation.definition.list.markdown"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition Link",
    "scope": "punctuation.definition.metadata.markdown",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Underline Link/Image",
    "scope": "markup.underline.link.markdown,markup.underline.link.image.markdown",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Link Title/Description",
    "scope": "string.other.link.title.markdown,string.other.link.description.markdown",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc Inline Raw",
    "scope": "markup.raw.monospace.asciidoc",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc Inline Raw Punctuation Definition",
    "scope": "punctuation.definition.asciidoc",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc List Punctuation Definition",
    "scope": "markup.list.asciidoc",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc underline link",
    "scope": "markup.link.asciidoc,markup.other.url.asciidoc",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc link name",
    "scope": "string.unquoted.asciidoc,markup.other.url.asciidoc",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Regular Expressions",
    "scope": "string.regexp",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "Embedded",
    "scope": "punctuation.section.embedded, variable.interpolation",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Embedded",
    "scope": "punctuation.section.embedded.begin,punctuation.section.embedded.end",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "illegal",
    "scope": "invalid.illegal",
    "settings": {
      "foreground": "#ffffff"
    }
  },
  {
    "name": "illegal",
    "scope": "invalid.illegal.bad-ampersand.html",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "scope": "invalid.illegal.unrecognized-tag.html",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Broken",
    "scope": "invalid.broken",
    "settings": {
      "foreground": "#ffffff"
    }
  },
  {
    "name": "Deprecated",
    "scope": "invalid.deprecated",
    "settings": {
      "foreground": "#ffffff"
    }
  },
  {
    "name": "html Deprecated",
    "scope": "invalid.deprecated.entity.other.attribute-name.html",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "Unimplemented",
    "scope": "invalid.unimplemented",
    "settings": {
      "foreground": "#ffffff"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > String Quoted Json",
    "scope": "source.json meta.structure.dictionary.json > string.quoted.json",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > String Quoted Json > Punctuation String",
    "scope": "source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > Value Json > String Quoted Json,source Json Meta Structure Array Json > Value Json > String Quoted Json,source Json Meta Structure Dictionary Json > Value Json > String Quoted Json > Punctuation,source Json Meta Structure Array Json > Value Json > String Quoted Json > Punctuation",
    "scope": "source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > Constant Language Json,source Json Meta Structure Array Json > Constant Language Json",
    "scope": "source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] JSON Property Name",
    "scope": "support.type.property-name.json",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] JSON Punctuation for Property Name",
    "scope": "support.type.property-name.json punctuation",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "laravel blade tag",
    "scope": "text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "laravel blade @",
    "scope": "text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "use statement for other classes",
    "scope": "support.other.namespace.use.php,support.other.namespace.use-as.php,entity.other.alias.php,meta.interface.php",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "error suppression",
    "scope": "keyword.operator.error-control.php",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "php instanceof",
    "scope": "keyword.operator.type.php",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "style double quoted array index normal begin",
    "scope": "punctuation.section.array.begin.php",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "style double quoted array index normal end",
    "scope": "punctuation.section.array.end.php",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "php illegal.non-null-typehinted",
    "scope": "invalid.illegal.non-null-typehinted.php",
    "settings": {
      "foreground": "#f44747"
    }
  },
  {
    "name": "php types",
    "scope": "storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "php call-function",
    "scope": "meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "php function-resets",
    "scope": "punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "support php constants",
    "scope": "support.constant.core.rust",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "support php constants",
    "scope": "support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "php goto",
    "scope": "entity.name.goto-label.php,support.other.php",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "php logical/bitwise operator",
    "scope": "keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "php regexp operator",
    "scope": "keyword.operator.regexp.php",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "php comparison",
    "scope": "keyword.operator.comparison.php",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "php heredoc/nowdoc",
    "scope": "keyword.operator.heredoc.php,keyword.operator.nowdoc.php",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "python function decorator @",
    "scope": "meta.function.decorator.python",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "python function support",
    "scope": "support.token.decorator.python,meta.function.decorator.identifier.python",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "parameter function js/ts",
    "scope": "function.parameter",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "brace function",
    "scope": "function.brace",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "parameter function ruby cs",
    "scope": "function.parameter.ruby, function.parameter.cs",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "constant.language.symbol.ruby",
    "scope": "constant.language.symbol.ruby",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "constant.language.symbol.hashkey.ruby",
    "scope": "constant.language.symbol.hashkey.ruby",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "rgb-value",
    "scope": "rgb-value",
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "rgb value",
    "scope": "inline-color-decoration rgb-value",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "rgb value less",
    "scope": "less rgb-value",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "sass selector",
    "scope": "selector.sass",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "ts primitive/builtin types",
    "scope": "support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "block scope",
    "scope": "block.scope.end,block.scope.begin",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "cs storage type",
    "scope": "storage.type.cs",
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "cs local variable",
    "scope": "entity.name.variable.local.cs",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "scope": "token.info-token",
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "scope": "token.warn-token",
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "scope": "token.error-token",
    "settings": {
      "foreground": "#f44747"
    }
  },
  {
    "scope": "token.debug-token",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "String interpolation",
    "scope": [
      "punctuation.definition.template-expression.begin",
      "punctuation.definition.template-expression.end",
      "punctuation.section.embedded"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Reset JavaScript string interpolation expression",
    "scope": [
      "meta.template.expression"
    ],
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Import module JS",
    "scope": [
      "keyword.operator.module"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "js Flowtype",
    "scope": [
      "support.type.type.flowtype"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "js Flow",
    "scope": [
      "support.type.primitive"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "js class prop",
    "scope": [
      "meta.property.object"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "js func parameter",
    "scope": [
      "variable.parameter.function.js"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "js template literals begin",
    "scope": [
      "keyword.other.template.begin"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "js template literals end",
    "scope": [
      "keyword.other.template.end"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "js template literals variable braces begin",
    "scope": [
      "keyword.other.substitution.begin"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "js template literals variable braces end",
    "scope": [
      "keyword.other.substitution.end"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "js operator.assignment",
    "scope": [
      "keyword.operator.assignment"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "go operator",
    "scope": [
      "keyword.operator.assignment.go"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "go operator",
    "scope": [
      "keyword.operator.arithmetic.go",
      "keyword.operator.address.go"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "c arithmetic",
    "scope": [
      "keyword.operator.arithmetic.c",
      "keyword.operator.arithmetic.cpp"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "Go package name",
    "scope": [
      "entity.name.package.go"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "elm prelude",
    "scope": [
      "support.type.prelude.elm"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "elm constant",
    "scope": [
      "support.constant.elm"
    ],
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "template literal",
    "scope": [
      "punctuation.quasi.element"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "html/pug (jade) escaped characters and entities",
    "scope": [
      "constant.character.entity"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "styling css pseudo-elements/classes to be able to differentiate from classes which are the same colour",
    "scope": [
      "entity.other.attribute-name.pseudo-element",
      "entity.other.attribute-name.pseudo-class"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "Clojure globals",
    "scope": [
      "entity.global.clojure"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Clojure symbols",
    "scope": [
      "meta.symbol.clojure"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Clojure constants",
    "scope": [
      "constant.keyword.clojure"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "CoffeeScript Function Argument",
    "scope": [
      "meta.arguments.coffee",
      "variable.parameter.function.coffee"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Ini Default Text",
    "scope": [
      "source.ini"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "Makefile prerequisities",
    "scope": [
      "meta.scope.prerequisites.makefile"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Makefile text colour",
    "scope": [
      "source.makefile"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Groovy import names",
    "scope": [
      "storage.modifier.import.groovy"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Groovy Methods",
    "scope": [
      "meta.method.groovy"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "Groovy Variables",
    "scope": [
      "meta.definition.variable.name.groovy"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Groovy Inheritance",
    "scope": [
      "meta.definition.class.inherited.classes.groovy"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "HLSL Semantic",
    "scope": [
      "support.variable.semantic.hlsl"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "HLSL Types",
    "scope": [
      "support.type.texture.hlsl",
      "support.type.sampler.hlsl",
      "support.type.object.hlsl",
      "support.type.object.rw.hlsl",
      "support.type.fx.hlsl",
      "support.type.object.hlsl"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "SQL Variables",
    "scope": [
      "text.variable",
      "text.bracketed"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "types",
    "scope": [
      "support.type.swift",
      "support.type.vb.asp"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "heading 1, keyword",
    "scope": [
      "entity.name.function.xi"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "heading 2, callable",
    "scope": [
      "entity.name.class.xi"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "heading 3, property",
    "scope": [
      "constant.character.character-class.regexp.xi"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "heading 4, type, class, interface",
    "scope": [
      "constant.regexp.xi"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "name": "heading 5, enums, preprocessor, constant, decorator",
    "scope": [
      "keyword.control.xi"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "name": "heading 6, number",
    "scope": [
      "invalid.xi"
    ],
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "string",
    "scope": [
      "beginning.punctuation.definition.quote.markdown.xi"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "comments",
    "scope": [
      "beginning.punctuation.definition.list.markdown.xi"
    ],
    "settings": {
      "foreground": "#7f848e"
    }
  },
  {
    "name": "link",
    "scope": [
      "constant.character.xi"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "accent",
    "scope": [
      "accent.xi"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "name": "wikiword",
    "scope": [
      "wikiword.xi"
    ],
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "name": "language operators like '+', '-' etc",
    "scope": [
      "constant.other.color.rgb-value.xi"
    ],
    "settings": {
      "foreground": "#ffffff"
    }
  },
  {
    "name": "elements to dim",
    "scope": [
      "punctuation.definition.tag.xi"
    ],
    "settings": {
      "foreground": "#5c6370"
    }
  },
  {
    "name": "C++/C#",
    "scope": [
      "entity.name.label.cs",
      "entity.name.scope-resolution.function.call",
      "entity.name.scope-resolution.function.definition"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "Markdown underscore-style headers",
    "scope": [
      "entity.name.label.cs",
      "markup.heading.setext.1.markdown",
      "markup.heading.setext.2.markdown"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "meta.brace.square",
    "scope": [
      " meta.brace.square"
    ],
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Comments",
    "scope": "comment, punctuation.definition.comment",
    "settings": {
      "foreground": "#7f848e"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Quote",
    "scope": "markup.quote.markdown",
    "settings": {
      "foreground": "#5c6370"
    }
  },
  {
    "name": "punctuation.definition.block.sequence.item.yaml",
    "scope": "punctuation.definition.block.sequence.item.yaml",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "scope": [
      "constant.language.symbol.elixir",
      "constant.language.symbol.double-quoted.elixir"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "scope": [
      "entity.name.variable.parameter.cs"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "scope": [
      "entity.name.variable.field.cs"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Deleted",
    "scope": "markup.deleted",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "Inserted",
    "scope": "markup.inserted",
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "Underline",
    "scope": "markup.underline",
    "settings": {
      "fontStyle": "underline"
    }
  },
  {
    "name": "punctuation.section.embedded.begin.php",
    "scope": [
      "punctuation.section.embedded.begin.php",
      "punctuation.section.embedded.end.php"
    ],
    "settings": {
      "foreground": "#BE5046"
    }
  },
  {
    "name": "support.other.namespace.php",
    "scope": [
      "support.other.namespace.php"
    ],
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Latex variable parameter",
    "scope": [
      "variable.parameter.function.latex"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "variable.other.object",
    "scope": [
      "variable.other.object"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "variable.other.constant.property",
    "scope": [
      "variable.other.constant.property"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "entity.other.inherited-class",
    "scope": [
      "entity.other.inherited-class"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "name": "c variable readwrite",
    "scope": "variable.other.readwrite.c",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "name": "php scope",
    "scope": "entity.name.variable.parameter.php,punctuation.separator.colon.php,constant.other.php",
    "settings": {
      "foreground": "#abb2bf"
    }
  },
  {
    "name": "Assembly",
    "scope": [
      "constant.numeric.decimal.asm.x86_64"
    ],
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "scope": [
      "support.other.parenthesis.regexp"
    ],
    "settings": {
      "foreground": "#d19a66"
    }
  },
  {
    "scope": [
      "constant.character.escape"
    ],
    "settings": {
      "foreground": "#56b6c2"
    }
  },
  {
    "scope": [
      "string.regexp"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "scope": [
      "log.info"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "scope": [
      "log.warning"
    ],
    "settings": {
      "foreground": "#e5c07b"
    }
  },
  {
    "scope": [
      "log.error"
    ],
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "scope": "keyword.operator.expression.is",
    "settings": {
      "foreground": "#c678dd"
    }
  },
  {
    "scope": "entity.name.label",
    "settings": {
      "foreground": "#e06c75"
    }
  },
  {
    "scope": [
      "support.class.math.block.environment.latex",
      "constant.other.general.math.tex"
    ],
    "settings": {
      "foreground": "#61afef"
    }
  },
  {
    "scope": [
      "constant.character.math.tex"
    ],
    "settings": {
      "foreground": "#98c379"
    }
  },
  {
    "name": "Markup: Strong",
    "scope": "markup.bold",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "Sections",
    "scope": "entity.name.section",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "CSS: Important Keyword",
    "scope": "keyword.other.important",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "Functions",
    "scope": [
      "entity.name.function",
      "meta.require",
      "support.function.any-method",
      "variable.function"
    ],
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "markup.bold.markdown",
    "scope": "markup.bold.markdown",
    "settings": {
      "fontStyle": "bold"
    }
  }
],
}

export const oneDarkProFlatLightTheme: MonacoThemeData = {
  base: 'vs',
  inherit: false,
  rules: [],
  colors: {},
  tokenColors: [
  {
    "scope": "meta.embedded",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "unison punctuation",
    "scope": "punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "haskell variable generic-type",
    "scope": "variable.other.generic-type.haskell",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "haskell storage type",
    "scope": "storage.type.haskell",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "support.variable.magic.python",
    "scope": "support.variable.magic.python",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "punctuation.separator.parameters.python",
    "scope": "punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "variable.parameter.function.language.special.self.python",
    "scope": "variable.parameter.function.language.special.self.python",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "variable.parameter.function.language.special.cls.python",
    "scope": "variable.parameter.function.language.special.cls.python",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "storage.modifier.lifetime.rust",
    "scope": "storage.modifier.lifetime.rust",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "support.function.std.rust",
    "scope": "support.function.std.rust",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "entity.name.lifetime.rust",
    "scope": "entity.name.lifetime.rust",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "variable.language.rust",
    "scope": "variable.language.rust",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "support.constant.edge",
    "scope": "support.constant.edge",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "regexp constant character-class",
    "scope": "constant.other.character-class.regexp",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "keyword.operator",
    "scope": [
      "keyword.operator.word"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "regexp operator.quantifier",
    "scope": "keyword.operator.quantifier.regexp",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Text",
    "scope": "variable.parameter.function",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Comment Markup Link",
    "scope": "comment markup.link",
    "settings": {
      "foreground": "#a0a1a7"
    }
  },
  {
    "name": "markup diff",
    "scope": "markup.changed.diff",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "diff",
    "scope": "meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "inserted.diff",
    "scope": "markup.inserted.diff",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "deleted.diff",
    "scope": "markup.deleted.diff",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "c++ function",
    "scope": "meta.function.c,meta.function.cpp",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "c++ block",
    "scope": "punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "js/ts punctuation separator key-value",
    "scope": "punctuation.separator.key-value",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "js/ts import keyword",
    "scope": "keyword.operator.expression.import",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "math js/ts",
    "scope": "support.constant.math",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "math property js/ts",
    "scope": "support.constant.property.math",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "js/ts variable.other.constant",
    "scope": "variable.other.constant",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "java type",
    "scope": [
      "storage.type.annotation.java",
      "storage.type.object.array.java"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "java source",
    "scope": "source.java",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "meta.method.java",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "java modifier.import",
    "scope": "storage.modifier.import.java,storage.type.java,storage.type.generic.java",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "java instanceof",
    "scope": "keyword.operator.instanceof.java",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "java variable.name",
    "scope": "meta.definition.variable.name.java",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "operator logical",
    "scope": "keyword.operator.logical",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "operator bitwise",
    "scope": "keyword.operator.bitwise",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "operator channel",
    "scope": "keyword.operator.channel",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "support.constant.property-value.scss",
    "scope": "support.constant.property-value.scss,support.constant.property-value.css",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "CSS/SCSS/LESS Operators",
    "scope": "keyword.operator.css,keyword.operator.scss,keyword.operator.less",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "css color standard name",
    "scope": "support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "css comma",
    "scope": "punctuation.separator.list.comma.css",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "css attribute-name.id",
    "scope": "support.constant.color.w3c-standard-color-name.css",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "css property-name",
    "scope": "support.type.vendored.property-name.css",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "js/ts module",
    "scope": "support.module.node,support.type.object.module,support.module.node",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "entity.name.type.module",
    "scope": "entity.name.type.module",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "js variable readwrite",
    "scope": "variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "js/ts json",
    "scope": "support.constant.json",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "js/ts Keyword",
    "scope": [
      "keyword.operator.expression.instanceof",
      "keyword.operator.new",
      "keyword.operator.ternary",
      "keyword.operator.optional",
      "keyword.operator.expression.keyof"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "js/ts console",
    "scope": "support.type.object.console",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "js/ts support.variable.property.process",
    "scope": "support.variable.property.process",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "js console function",
    "scope": "entity.name.function,support.function.console",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "keyword.operator.misc.rust",
    "scope": "keyword.operator.misc.rust",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "keyword.operator.sigil.rust",
    "scope": "keyword.operator.sigil.rust",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "operator",
    "scope": "keyword.operator.delete",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "js dom",
    "scope": "support.type.object.dom",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "js dom variable",
    "scope": "support.variable.dom,support.variable.property.dom",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "keyword.operator",
    "scope": "keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "C operator assignment",
    "scope": "keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Punctuation",
    "scope": "punctuation.separator.delimiter",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Other punctuation .c",
    "scope": "punctuation.separator.c,punctuation.separator.cpp",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "C type posix-reserved",
    "scope": "support.type.posix-reserved.c,support.type.posix-reserved.cpp",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "keyword.operator.sizeof.c",
    "scope": "keyword.operator.sizeof.c,keyword.operator.sizeof.cpp",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "python parameter",
    "scope": "variable.parameter.function.language.python",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "python type",
    "scope": "support.type.python",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "python logical",
    "scope": "keyword.operator.logical.python",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "pyCs",
    "scope": "variable.parameter.function.python",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "python block",
    "scope": "punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "python function-call.generic",
    "scope": "meta.function-call.generic.python",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "python placeholder reset to normal string",
    "scope": "constant.character.format.placeholder.other.python",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Operators",
    "scope": "keyword.operator",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Compound Assignment Operators",
    "scope": "keyword.operator.assignment.compound",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Compound Assignment Operators js/ts",
    "scope": "keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "Keywords",
    "scope": "keyword",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Namespaces",
    "scope": "entity.name.namespace",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Variables",
    "scope": "variable",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Variables",
    "scope": "variable.c",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Language variables",
    "scope": "variable.language",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Java Variables",
    "scope": "token.variable.parameter.java",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Java Imports",
    "scope": "import.storage.java",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Packages",
    "scope": "token.package.keyword",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Packages",
    "scope": "token.package",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Functions",
    "scope": [
      "entity.name.function",
      "meta.require",
      "support.function.any-method",
      "variable.function"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Classes",
    "scope": "entity.name.type.namespace",
    "settings": {
      "foreground": "#c18401",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Classes",
    "scope": "support.class, entity.name.type.class",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Class name",
    "scope": "entity.name.class.identifier.namespace.type",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Class name",
    "scope": [
      "entity.name.class",
      "variable.other.class.js",
      "variable.other.class.ts"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Class name php",
    "scope": "variable.other.class.php",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Type Name",
    "scope": "entity.name.type",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Keyword Control",
    "scope": "keyword.control",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Control Elements",
    "scope": "control.elements, keyword.operator.less",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Methods",
    "scope": "keyword.other.special-method",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Storage",
    "scope": "storage",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Storage JS TS",
    "scope": "token.storage",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Source Js Keyword Operator Delete,source Js Keyword Operator In,source Js Keyword Operator Of,source Js Keyword Operator Instanceof,source Js Keyword Operator New,source Js Keyword Operator Typeof,source Js Keyword Operator Void",
    "scope": "keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Java Storage",
    "scope": "token.storage.type.java",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Support",
    "scope": "support.function",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "Support type",
    "scope": "support.type.property-name",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] toml support",
    "scope": "support.type.property-name.toml, support.type.property-name.table.toml, support.type.property-name.array.toml",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Support type",
    "scope": "support.constant.property-value",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Support type",
    "scope": "support.constant.font-name",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Meta tag",
    "scope": "meta.tag",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Strings",
    "scope": "string",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "Constant other symbol",
    "scope": "constant.other.symbol",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "Integers",
    "scope": "constant.numeric",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Constants",
    "scope": "constant",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Constants",
    "scope": "punctuation.definition.constant",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Tags",
    "scope": "entity.name.tag",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Attributes",
    "scope": "entity.other.attribute-name",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Attribute IDs",
    "scope": "entity.other.attribute-name.id",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Attribute class",
    "scope": "entity.other.attribute-name.class.css",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Selector",
    "scope": "meta.selector",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Headings",
    "scope": "markup.heading",
    "settings": {
      "foreground": "#e45649",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Headings",
    "scope": "markup.heading punctuation.definition.heading, entity.name.section",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Units",
    "scope": "keyword.other.unit",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Bold",
    "scope": "markup.bold,todo.bold",
    "settings": {
      "foreground": "#986801",
      "fontStyle": "bold"
    }
  },
  {
    "name": "Bold",
    "scope": "punctuation.definition.bold",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "markup Italic",
    "scope": "markup.italic, punctuation.definition.italic,todo.emphasis",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "emphasis md",
    "scope": "emphasis md",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown headings",
    "scope": "entity.name.section.markdown",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown heading Punctuation Definition",
    "scope": "punctuation.definition.heading.markdown",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "punctuation.definition.list.begin.markdown",
    "scope": "punctuation.definition.list.begin.markdown",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown heading setext",
    "scope": "markup.heading.setext",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition Bold",
    "scope": "punctuation.definition.bold.markdown",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw",
    "scope": "markup.inline.raw.markdown",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw",
    "scope": "markup.inline.raw.string.markdown",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Inline Raw punctuation",
    "scope": "punctuation.definition.raw.markdown",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown List Punctuation Definition",
    "scope": "punctuation.definition.list.markdown",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition String",
    "scope": [
      "punctuation.definition.string.begin.markdown",
      "punctuation.definition.string.end.markdown",
      "punctuation.definition.metadata.markdown"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "beginning.punctuation.definition.list.markdown",
    "scope": [
      "beginning.punctuation.definition.list.markdown"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Punctuation Definition Link",
    "scope": "punctuation.definition.metadata.markdown",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Underline Link/Image",
    "scope": "markup.underline.link.markdown,markup.underline.link.image.markdown",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Link Title/Description",
    "scope": "string.other.link.title.markdown,string.other.link.description.markdown",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc Inline Raw",
    "scope": "markup.raw.monospace.asciidoc",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc Inline Raw Punctuation Definition",
    "scope": "punctuation.definition.asciidoc",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc List Punctuation Definition",
    "scope": "markup.list.asciidoc",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc underline link",
    "scope": "markup.link.asciidoc,markup.other.url.asciidoc",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Asciidoc link name",
    "scope": "string.unquoted.asciidoc,markup.other.url.asciidoc",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Regular Expressions",
    "scope": "string.regexp",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "Embedded",
    "scope": "punctuation.section.embedded, variable.interpolation",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Embedded",
    "scope": "punctuation.section.embedded.begin,punctuation.section.embedded.end",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "illegal",
    "scope": "invalid.illegal",
    "settings": {
      "foreground": "#000000"
    }
  },
  {
    "name": "illegal",
    "scope": "invalid.illegal.bad-ampersand.html",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "scope": "invalid.illegal.unrecognized-tag.html",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Broken",
    "scope": "invalid.broken",
    "settings": {
      "foreground": "#000000"
    }
  },
  {
    "name": "Deprecated",
    "scope": "invalid.deprecated",
    "settings": {
      "foreground": "#000000"
    }
  },
  {
    "name": "html Deprecated",
    "scope": "invalid.deprecated.entity.other.attribute-name.html",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "Unimplemented",
    "scope": "invalid.unimplemented",
    "settings": {
      "foreground": "#000000"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > String Quoted Json",
    "scope": "source.json meta.structure.dictionary.json > string.quoted.json",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > String Quoted Json > Punctuation String",
    "scope": "source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > Value Json > String Quoted Json,source Json Meta Structure Array Json > Value Json > String Quoted Json,source Json Meta Structure Dictionary Json > Value Json > String Quoted Json > Punctuation,source Json Meta Structure Array Json > Value Json > String Quoted Json > Punctuation",
    "scope": "source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "Source Json Meta Structure Dictionary Json > Constant Language Json,source Json Meta Structure Array Json > Constant Language Json",
    "scope": "source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] JSON Property Name",
    "scope": "support.type.property-name.json",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] JSON Punctuation for Property Name",
    "scope": "support.type.property-name.json punctuation",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "laravel blade tag",
    "scope": "text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "laravel blade @",
    "scope": "text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "use statement for other classes",
    "scope": "support.other.namespace.use.php,support.other.namespace.use-as.php,entity.other.alias.php,meta.interface.php",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "error suppression",
    "scope": "keyword.operator.error-control.php",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "php instanceof",
    "scope": "keyword.operator.type.php",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "style double quoted array index normal begin",
    "scope": "punctuation.section.array.begin.php",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "style double quoted array index normal end",
    "scope": "punctuation.section.array.end.php",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "php illegal.non-null-typehinted",
    "scope": "invalid.illegal.non-null-typehinted.php",
    "settings": {
      "foreground": "#f44747"
    }
  },
  {
    "name": "php types",
    "scope": "storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "php call-function",
    "scope": "meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "php function-resets",
    "scope": "punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "support php constants",
    "scope": "support.constant.core.rust",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "support php constants",
    "scope": "support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "php goto",
    "scope": "entity.name.goto-label.php,support.other.php",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "php logical/bitwise operator",
    "scope": "keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "php regexp operator",
    "scope": "keyword.operator.regexp.php",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "php comparison",
    "scope": "keyword.operator.comparison.php",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "php heredoc/nowdoc",
    "scope": "keyword.operator.heredoc.php,keyword.operator.nowdoc.php",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "python function decorator @",
    "scope": "meta.function.decorator.python",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "python function support",
    "scope": "support.token.decorator.python,meta.function.decorator.identifier.python",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "parameter function js/ts",
    "scope": "function.parameter",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "brace function",
    "scope": "function.brace",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "parameter function ruby cs",
    "scope": "function.parameter.ruby, function.parameter.cs",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "constant.language.symbol.ruby",
    "scope": "constant.language.symbol.ruby",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "constant.language.symbol.hashkey.ruby",
    "scope": "constant.language.symbol.hashkey.ruby",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "rgb-value",
    "scope": "rgb-value",
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "rgb value",
    "scope": "inline-color-decoration rgb-value",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "rgb value less",
    "scope": "less rgb-value",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "sass selector",
    "scope": "selector.sass",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "ts primitive/builtin types",
    "scope": "support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "block scope",
    "scope": "block.scope.end,block.scope.begin",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "cs storage type",
    "scope": "storage.type.cs",
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "cs local variable",
    "scope": "entity.name.variable.local.cs",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "scope": "token.info-token",
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "scope": "token.warn-token",
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "scope": "token.error-token",
    "settings": {
      "foreground": "#f44747"
    }
  },
  {
    "scope": "token.debug-token",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "String interpolation",
    "scope": [
      "punctuation.definition.template-expression.begin",
      "punctuation.definition.template-expression.end",
      "punctuation.section.embedded"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Reset JavaScript string interpolation expression",
    "scope": [
      "meta.template.expression"
    ],
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Import module JS",
    "scope": [
      "keyword.operator.module"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "js Flowtype",
    "scope": [
      "support.type.type.flowtype"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "js Flow",
    "scope": [
      "support.type.primitive"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "js class prop",
    "scope": [
      "meta.property.object"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "js func parameter",
    "scope": [
      "variable.parameter.function.js"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "js template literals begin",
    "scope": [
      "keyword.other.template.begin"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "js template literals end",
    "scope": [
      "keyword.other.template.end"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "js template literals variable braces begin",
    "scope": [
      "keyword.other.substitution.begin"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "js template literals variable braces end",
    "scope": [
      "keyword.other.substitution.end"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "js operator.assignment",
    "scope": [
      "keyword.operator.assignment"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "go operator",
    "scope": [
      "keyword.operator.assignment.go"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "go operator",
    "scope": [
      "keyword.operator.arithmetic.go",
      "keyword.operator.address.go"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "c arithmetic",
    "scope": [
      "keyword.operator.arithmetic.c",
      "keyword.operator.arithmetic.cpp"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "Go package name",
    "scope": [
      "entity.name.package.go"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "elm prelude",
    "scope": [
      "support.type.prelude.elm"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "elm constant",
    "scope": [
      "support.constant.elm"
    ],
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "template literal",
    "scope": [
      "punctuation.quasi.element"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "html/pug (jade) escaped characters and entities",
    "scope": [
      "constant.character.entity"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "styling css pseudo-elements/classes to be able to differentiate from classes which are the same colour",
    "scope": [
      "entity.other.attribute-name.pseudo-element",
      "entity.other.attribute-name.pseudo-class"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "Clojure globals",
    "scope": [
      "entity.global.clojure"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Clojure symbols",
    "scope": [
      "meta.symbol.clojure"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Clojure constants",
    "scope": [
      "constant.keyword.clojure"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "CoffeeScript Function Argument",
    "scope": [
      "meta.arguments.coffee",
      "variable.parameter.function.coffee"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Ini Default Text",
    "scope": [
      "source.ini"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "Makefile prerequisities",
    "scope": [
      "meta.scope.prerequisites.makefile"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Makefile text colour",
    "scope": [
      "source.makefile"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Groovy import names",
    "scope": [
      "storage.modifier.import.groovy"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Groovy Methods",
    "scope": [
      "meta.method.groovy"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "Groovy Variables",
    "scope": [
      "meta.definition.variable.name.groovy"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Groovy Inheritance",
    "scope": [
      "meta.definition.class.inherited.classes.groovy"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "HLSL Semantic",
    "scope": [
      "support.variable.semantic.hlsl"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "HLSL Types",
    "scope": [
      "support.type.texture.hlsl",
      "support.type.sampler.hlsl",
      "support.type.object.hlsl",
      "support.type.object.rw.hlsl",
      "support.type.fx.hlsl",
      "support.type.object.hlsl"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "SQL Variables",
    "scope": [
      "text.variable",
      "text.bracketed"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "types",
    "scope": [
      "support.type.swift",
      "support.type.vb.asp"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "heading 1, keyword",
    "scope": [
      "entity.name.function.xi"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "heading 2, callable",
    "scope": [
      "entity.name.class.xi"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "heading 3, property",
    "scope": [
      "constant.character.character-class.regexp.xi"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "heading 4, type, class, interface",
    "scope": [
      "constant.regexp.xi"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "name": "heading 5, enums, preprocessor, constant, decorator",
    "scope": [
      "keyword.control.xi"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "name": "heading 6, number",
    "scope": [
      "invalid.xi"
    ],
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "string",
    "scope": [
      "beginning.punctuation.definition.quote.markdown.xi"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "comments",
    "scope": [
      "beginning.punctuation.definition.list.markdown.xi"
    ],
    "settings": {
      "foreground": "#7f848e"
    }
  },
  {
    "name": "link",
    "scope": [
      "constant.character.xi"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "accent",
    "scope": [
      "accent.xi"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "name": "wikiword",
    "scope": [
      "wikiword.xi"
    ],
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "name": "language operators like '+', '-' etc",
    "scope": [
      "constant.other.color.rgb-value.xi"
    ],
    "settings": {
      "foreground": "#000000"
    }
  },
  {
    "name": "elements to dim",
    "scope": [
      "punctuation.definition.tag.xi"
    ],
    "settings": {
      "foreground": "#a0a1a7"
    }
  },
  {
    "name": "C++/C#",
    "scope": [
      "entity.name.label.cs",
      "entity.name.scope-resolution.function.call",
      "entity.name.scope-resolution.function.definition"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "Markdown underscore-style headers",
    "scope": [
      "entity.name.label.cs",
      "markup.heading.setext.1.markdown",
      "markup.heading.setext.2.markdown"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "meta.brace.square",
    "scope": [
      " meta.brace.square"
    ],
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Comments",
    "scope": "comment, punctuation.definition.comment",
    "settings": {
      "foreground": "#7f848e"
    }
  },
  {
    "name": "[VSCODE-CUSTOM] Markdown Quote",
    "scope": "markup.quote.markdown",
    "settings": {
      "foreground": "#a0a1a7"
    }
  },
  {
    "name": "punctuation.definition.block.sequence.item.yaml",
    "scope": "punctuation.definition.block.sequence.item.yaml",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "scope": [
      "constant.language.symbol.elixir",
      "constant.language.symbol.double-quoted.elixir"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "scope": [
      "entity.name.variable.parameter.cs"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "scope": [
      "entity.name.variable.field.cs"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Deleted",
    "scope": "markup.deleted",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "Inserted",
    "scope": "markup.inserted",
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "Underline",
    "scope": "markup.underline",
    "settings": {
      "fontStyle": "underline"
    }
  },
  {
    "name": "punctuation.section.embedded.begin.php",
    "scope": [
      "punctuation.section.embedded.begin.php",
      "punctuation.section.embedded.end.php"
    ],
    "settings": {
      "foreground": "#BE5046"
    }
  },
  {
    "name": "support.other.namespace.php",
    "scope": [
      "support.other.namespace.php"
    ],
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Latex variable parameter",
    "scope": [
      "variable.parameter.function.latex"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "variable.other.object",
    "scope": [
      "variable.other.object"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "variable.other.constant.property",
    "scope": [
      "variable.other.constant.property"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "entity.other.inherited-class",
    "scope": [
      "entity.other.inherited-class"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "name": "c variable readwrite",
    "scope": "variable.other.readwrite.c",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "name": "php scope",
    "scope": "entity.name.variable.parameter.php,punctuation.separator.colon.php,constant.other.php",
    "settings": {
      "foreground": "#383a42"
    }
  },
  {
    "name": "Assembly",
    "scope": [
      "constant.numeric.decimal.asm.x86_64"
    ],
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "scope": [
      "support.other.parenthesis.regexp"
    ],
    "settings": {
      "foreground": "#986801"
    }
  },
  {
    "scope": [
      "constant.character.escape"
    ],
    "settings": {
      "foreground": "#0184bc"
    }
  },
  {
    "scope": [
      "string.regexp"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "scope": [
      "log.info"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "scope": [
      "log.warning"
    ],
    "settings": {
      "foreground": "#c18401"
    }
  },
  {
    "scope": [
      "log.error"
    ],
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "scope": "keyword.operator.expression.is",
    "settings": {
      "foreground": "#a626a4"
    }
  },
  {
    "scope": "entity.name.label",
    "settings": {
      "foreground": "#e45649"
    }
  },
  {
    "scope": [
      "support.class.math.block.environment.latex",
      "constant.other.general.math.tex"
    ],
    "settings": {
      "foreground": "#4078f2"
    }
  },
  {
    "scope": [
      "constant.character.math.tex"
    ],
    "settings": {
      "foreground": "#50a14f"
    }
  },
  {
    "name": "Markup: Strong",
    "scope": "markup.bold",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "Sections",
    "scope": "entity.name.section",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "CSS: Important Keyword",
    "scope": "keyword.other.important",
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "Functions",
    "scope": [
      "entity.name.function",
      "meta.require",
      "support.function.any-method",
      "variable.function"
    ],
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "name": "markup.bold.markdown",
    "scope": "markup.bold.markdown",
    "settings": {
      "fontStyle": "bold"
    }
  }
],
}
