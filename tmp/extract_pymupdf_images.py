import fitz
import os
import glob

pdf_folder = r"E:\bultin"
out_folder = r"E:\mo3adly\tmp\pdf_images"
os.makedirs(out_folder, exist_ok=True)

pdf_files = glob.glob(os.path.join(pdf_folder, "*.pdf"))

for pdf_file in pdf_files:
    if "41062025" in pdf_file or "\\4" in pdf_file.lower() or " 4 " in pdf_file.lower() or "4eco" in pdf_file.lower() or "4l" in pdf_file.lower() or "4sc" in pdf_file.lower() or "4t" in pdf_file.lower():
        continue
    try:
        doc = fitz.open(pdf_file)
        page = doc.load_page(0)  # first page
        pix = page.get_pixmap()
        base = os.path.basename(pdf_file)
        img_path = os.path.join(out_folder, base.replace(".pdf", ".png"))
        pix.save(img_path)
        print(f"Extracted image {base}")
    except Exception as e:
        print(f"Failed {pdf_file}: {e}")
