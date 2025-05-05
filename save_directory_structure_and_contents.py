import os


def save_structure_and_contents(start_path, output_file):
    with open(output_file, "w", encoding="utf-8") as f:
        for root, dirs, files in os.walk(start_path):
            # 相対パス表示（ルートからのパス）
            rel_root = os.path.relpath(root, start_path)
            indent = "    " * (rel_root.count(os.sep))
            f.write(f"{indent}[DIR] {rel_root if rel_root != '.' else '.'}\n")

            for file in files:
                file_path = os.path.join(root, file)
                rel_file_path = os.path.relpath(file_path, start_path)
                f.write(f"{indent}    [FILE] {rel_file_path}\n")
                try:
                    with open(file_path, "r", encoding="utf-8") as file_content:
                        content = file_content.read()
                except Exception as e:
                    content = f"[Error reading file: {e}]\n"

                f.write(f"{indent}        --- Start of {rel_file_path} ---\n")
                f.write(content + "\n")
                f.write(f"{indent}        --- End of {rel_file_path} ---\n\n")


if __name__ == "__main__":
    # 対象となるパス（このスクリプトと同じ階層）
    target_dir = os.path.dirname(os.path.abspath(__file__))
    output_txt_path = os.path.join(target_dir, "project_structure_and_contents.txt")

    save_structure_and_contents(target_dir, output_txt_path)
    print(f"構造と中身を '{output_txt_path}' に保存しました。")
