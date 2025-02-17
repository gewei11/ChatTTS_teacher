#SDK模型下载
from modelscope import snapshot_download

# 指定目标目录为当前工作目录下的models文件夹
model_dir = snapshot_download('pzc163/chatTTS', cache_dir='models')
