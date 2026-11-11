// see also: @/plugins/expressive-code/custom-copy-button.tsx

// the event handler is registered on the entire document instead of every single button
// because buttons may change dynamically but the script is run only once
document.addEventListener('click', (e) => {
  if (e.target === null) return

  const target = e.target as HTMLElement

  if (!target.hasAttribute('data-custom-copy-button')) return

  const preEle = target.closest('pre')
  const codeEle = preEle?.querySelector('code')

  const code = Array.from(
    codeEle?.querySelectorAll('.code:not(summary *)') ?? [],
  )
    .map((el) => el.textContent)
    .map((t) => (t === '\n' ? '' : t))
    .join('\n')

  navigator.clipboard.writeText(code)

  console.info(
    'Copied',
    code.split('\n').length,
    'line(s) of code to clipboard',
  )

  const timeoutId = target.getAttribute('data-timeout-id')
  if (timeoutId) {
    clearTimeout(parseInt(timeoutId, 10))
  }

  target.classList.add('success')

  // 设置新的timeout并保存ID到按钮的自定义属性中
  const newTimeoutId = setTimeout(() => {
    target.classList.remove('success')
  }, 1000)

  target.setAttribute('data-timeout-id', newTimeoutId.toString())
})
