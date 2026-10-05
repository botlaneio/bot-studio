import base64, subprocess, os, time
from playwright.sync_api import sync_playwright

# Renders film.html frame by frame (deterministic render(t)) into master.mp4.
FPS, N = 30, 300
ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(FPS), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-colorspace', 'bt709',
  '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', 'master.mp4'], stdin=subprocess.PIPE)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 720, 'height': 1280})
    pg.goto('file://' + os.path.abspath('film.html'))
    pg.wait_for_function('document.title==="ready"')
    t0 = time.time()
    for f in range(N):
        d = pg.evaluate(f'(renderFrame({f},{FPS},3), document.getElementById("c").toDataURL("image/png"))')
        ff.stdin.write(base64.b64decode(d.split(',')[1]))
    b.close()
ff.stdin.close()
ff.wait()
print('rendered in', int(time.time() - t0), 's')
