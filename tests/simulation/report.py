from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('compare-phase1.py')),run_name='__main__')
