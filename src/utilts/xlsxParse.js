import XLSX from 'xlsx'

export const xlsxParse = (file) => {
    const workfile = XLSX.read(file)
    const sheetNames = workfile.SheetNames
    const worksheet = workfile.Sheets[sheetNames[0]];

    const json_xlsx = XLSX.utils.sheet_to_json(worksheet)
    return json_xlsx
}

