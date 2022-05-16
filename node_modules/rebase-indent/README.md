# Rebase indent
Rebase a string or an array of indented lines based on the first indentation level. 

`rebase(['  line 1', '  line 2'])`
`rebase(['  line 1', '  line 2'], 4)`
`rebase('  line 1\n  line 2')`

```js
rebase(`
        line 1
            line 2
        line 3
            line 4
`);
```

```text
line 1
    line 2
line 3
    line 4
```

Optionally specify a new base indent (number of spaces). Default is 0.

```js
rebase(`
    line 1
        line 2
`, 10);
```

```text
          line 1
            line 2
```