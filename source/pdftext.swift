import PDFKit
let doc = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1]))!
for i in 0..<doc.pageCount {
  let t = (doc.page(at: i)?.string ?? "").replacingOccurrences(of: "\n", with: " ")
  print("===PAGE \(i+1)===")
  print(t)
}
