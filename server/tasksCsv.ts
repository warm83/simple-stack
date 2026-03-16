type CsvTaskStatus = 'todo' | 'in_progress' | 'done'
type CsvTaskPriority = 'low' | 'medium' | 'high'

type CsvTaskInsert = {
  title: string
  description: string
  status: CsvTaskStatus
  priority: CsvTaskPriority
  assignee: string
  due_date: string | null
}

const requiredHeaders = ['課題', '説明', 'ステータス', '優先度', '担当者', '期限']

const statusMap: Record<string, CsvTaskStatus> = {
  未着手: 'todo',
  進行中: 'in_progress',
  完了: 'done',
}

const priorityMap: Record<string, CsvTaskPriority> = {
  低: 'low',
  中: 'medium',
  高: 'high',
}

function parseCsv(csv: string) {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentValue = ''
  let inQuotes = false

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index]

    if (char === '"') {
      const nextChar = csv[index + 1]
      if (inQuotes && nextChar === '"') {
        currentValue += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentValue)
      currentValue = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && csv[index + 1] === '\n') {
        index += 1
      }
      currentRow.push(currentValue)
      rows.push(currentRow)
      currentRow = []
      currentValue = ''
      continue
    }

    currentValue += char
  }

  if (inQuotes) {
    throw new Error('CSVの引用符が閉じられていません。')
  }

  if (currentValue.length > 0 || currentRow.length > 0) {
    currentRow.push(currentValue)
    rows.push(currentRow)
  }

  return rows.filter((row) => row.some((cell) => cell.trim() !== ''))
}

function normalizeHeader(header: string) {
  return header.trim().replace(/^\uFEFF/, '')
}

function requireValue(value: string | undefined, label: string, rowNumber: number) {
  const normalized = value?.trim() ?? ''
  if (!normalized) {
    throw new Error(`${rowNumber}行目の「${label}」は必須です。`)
  }
  return normalized
}

function mapStatus(value: string, rowNumber: number): CsvTaskStatus {
  const mapped = statusMap[value.trim()]
  if (!mapped) {
    throw new Error(`${rowNumber}行目のステータスが不正です。`)
  }
  return mapped
}

function mapPriority(value: string, rowNumber: number): CsvTaskPriority {
  const mapped = priorityMap[value.trim()]
  if (!mapped) {
    throw new Error(`${rowNumber}行目の優先度が不正です。`)
  }
  return mapped
}

export function parseTasksCsv(csv: string): CsvTaskInsert[] {
  const rows = parseCsv(csv)

  if (rows.length < 2) {
    throw new Error('CSVに取り込み対象のデータ行がありません。')
  }

  const headers = rows[0].map(normalizeHeader)
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))

  if (missingHeaders.length > 0) {
    throw new Error(`CSVヘッダーが不足しています: ${missingHeaders.join(', ')}`)
  }

  return rows.slice(1).map((row, index) => {
    const rowNumber = index + 2
    const values = Object.fromEntries(headers.map((header, column) => [header, row[column] ?? '']))

    return {
      title: requireValue(values['課題'], '課題', rowNumber),
      description: requireValue(values['説明'], '説明', rowNumber),
      status: mapStatus(requireValue(values['ステータス'], 'ステータス', rowNumber), rowNumber),
      priority: mapPriority(requireValue(values['優先度'], '優先度', rowNumber), rowNumber),
      assignee: requireValue(values['担当者'], '担当者', rowNumber),
      due_date: values['期限']?.trim() ? values['期限'].trim() : null,
    }
  })
}
