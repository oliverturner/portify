# Background: Portify v2

## Why the rewrite?
Portify v1 was built to explore two technologies I wanted to learn: [Svelte](https://svelte.dev) and [Architect](https://arc.codes/docs/en/guides/get-started/quickstart); having built up some experience with them, I wanted to take another run at the project without the burden of past mistakes. Ground-up rewrites aren't usually a practical (or desirable) option in professional development, so I'm relishing the opportunity that a personal project gives me to build on simpler foundations.

## Same type safety, less overhead
I _really_ like TypeScript. The type system and tooling are a wonderful development boosters, so that's what Portify v1 was written in... but the rewrite has also presented the opportunity to investigate whether JSDoc is sufficient to bring the benefits of TS - hinting, autocompletion, checking, etc - to a pure JS application without The Overhead.

## "The Overhead"?
Real talk: as fans of TS we tend to gloss over the incidental complexity that writing .ts files brings with it: 
- We need to install and run the infrastructure to turn our application code into output compatible with other targets.
- Additional configuration and plugins are required to support non-application code: bundlers, linters, testing frameworks, etc.
- TS is popular enough that many tools have decided to absorb the burden of supporting it but it's a cost that our choice imposes on others.

That's The Overhead.

## Is JSDoc the answer?
Based on my experience of rewriting Portify v2 as a pure JS project I'd say "absolutely". The suggestion surprises folks who imagine that we're talking about defining types solely _in_ JSDoc (which is possible but cumbersome); instead we can import standard TS definition files into JS _through_ JSDoc.

<!-- screenshot -->

Sometimes I get pushback from people claiming claim that this isn't "true" TS. This is when I like to share [Rob Palmer's](https://twitter.com/robpalmer2/status/1362684227876253697) _excellent_ rebuttal:

> Personally I try to avoid conflating [adoption of TS with transpilation].
>
> "using TypeScript" means using TS static types, that may be expressed as inline syntax, but could equally come from comments or sibling declaration files.
>
> "using *.ts files" implies inline type syntax and a build step.

Hopefully this repo will demonstrate some of the ways that we can opt in to better code without the having to rewrite everything in a different language.