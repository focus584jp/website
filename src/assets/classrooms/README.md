# 教室風景の写真

各教室の写真は `src/assets/classrooms/<slug>/` に置くと、
教室詳細ページ（/classrooms/<slug>）の「教室の様子」に自動でギャラリー表示されます。

- 対応形式: jpg / jpeg / png / webp
- ファイル名の昇順で並びます（例: 01.jpg, 02.jpg …）
- astro:assets で自動的に最適化されます

slug 一覧: inage / nishi-chiba / tsuga / shin-kemigawa / inage-kaigan / soga / kamatori / myoden / goi / yotsukaido
- 置く前に長辺2000px程度・JPEG品質85にリサイズする（元のカメラJPEG 4608px/2〜3MBのままだとgitが重い。生成側は最大1200pxしか使わない）
- 並び順はユーザーが書き出し時に付けた番号（myoden_pic1〜4 等）に従う（妙典は 01=外観）

投入済み（2026-09-16）: myoden（Lightroom現像済みの正式版） / shin-kemigawa / inage-kaigan / inage（後3つはカメラJPEGの仮投入。現像済み版が来たら差し替え）
