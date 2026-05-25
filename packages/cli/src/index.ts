#!/usr/bin/env node
import { Command } from 'commander'
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'

const program = new Command()

program.name('shadcn-pro').description('Add pro components to your project').version('0.1.0')

program.command('init').description('Initialize shadcn-pro in your project').action(init)

program
  .command('add <component>')
  .description('Add a component to your project')
  .option('-p, --path <path>', 'Custom output path')
  .action(add)

program
  .command('list')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(list)

program.parse()
