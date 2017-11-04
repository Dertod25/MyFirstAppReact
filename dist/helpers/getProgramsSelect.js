export default function getProgramsSelect(arr) {
  if (arr) {
    return arr.map(program => ({value: program.id, label: program.title}));
  }
  return [{ value: 'No programs', label: 'No programs', disabled: true }];
}
