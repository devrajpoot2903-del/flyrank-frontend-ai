# AI-Assisted Workflow Comparison

## Assignment

FE-03 – The AI-Assisted Workflow Drill

---

## Round 1 – Basic AI Prompt

### Prompt Used

Create a simple React settings form using plain React and App.css only.

### Result

The AI generated a basic settings form containing:

- Name input
- Email input
- Save button

The interface looked clean, but it only created the UI.

### Limitations

- No validation
- Save button always enabled
- Invalid email accepted
- No success message
- No accessibility improvements
- No inline error messages

---

## Round 2 – Improved Prompt

### Prompt Used

Improve the existing React settings form.

Do not create new files.

Update App.jsx in place.

Requirements:

- Validate name and email
- Disable Save button until the form is valid
- Show inline validation errors
- Display a success message after successful submission
- Use semantic HTML
- Improve accessibility
- Keep everything inside App.jsx and App.css

---

## Improvements

Round 2 significantly improved the project.

New features included:

- Name validation
- Email format validation
- Disabled Save button until inputs became valid
- Inline error messages
- Success message after valid submission
- Better accessibility using semantic HTML
- Cleaner component structure

---

## Comparison

Round 1 was useful for generating a quick prototype.

Round 2 produced a much more realistic and production-ready implementation because the prompt contained clear requirements, constraints, and expected behaviour.

Providing detailed instructions resulted in higher quality code with fewer manual changes.

---

## Lessons Learned

This assignment taught me that AI works best when prompts are specific instead of generic.

I also learned that validating AI-generated code is important before accepting the output.

In future projects I will always:

- Write detailed prompts
- Verify the generated code manually
- Test all features before accepting AI output
- Improve prompts instead of accepting the first result