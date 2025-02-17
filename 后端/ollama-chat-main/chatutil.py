# ChatTTS-01.py
 
import ChatTTS
import torch
import torchaudio
import soundfile
import time
import torch
import random

from modelscope import snapshot_download

module_name = "chatutil"


MODELPATH = "models/pzc163/chatTTS/asset"
 
class ChatTTSUtil:
    def __init__(self ,
                 modelPath = MODELPATH,
                 saveFilePath = "output/" ,
                 fixSpkStyle = True):
        # 初始化ChatTTSUtil类，设置模型路径、保存文件路径和是否固定说话风格
        self.modelPath = modelPath
        self.wavfilePath = saveFilePath
        self.fixSpkStyle = fixSpkStyle
        self.chat = ChatTTS.Chat()
        self.chat.load_models(local_path = modelPath)
        # 设置文本精炼参数
        self.params_refine_text = {"prompt": "[oral_0][laugh_0][break_0]"}
        # Config the speech style with random generation
        std , mean = torch.load(f"{MODELPATH}/spk_stat.pt").chunk(2)
        rand_spk = torch.randn(768) * std + mean
        self.params_infer_code = {
            "spk_emb": rand_spk,
            "temperature": .3,
            "top_P": 0.7,
            "top_K": 20,
            "prompt": "[speed_5]"
        }

    def setRefineTextConf(self , oralConf = "[oral_0]" , laughConf = "[laugh_0]" , breakConf = "[break_0]"):
        # 定义一个方法setRefineTextConf，用于设置文本精炼的配置
        # 参数oralConf默认值为"[oral_0]"，表示口语化配置
        # 参数laughConf默认值为"[laugh_0]"，表示笑声配置
        # 参数breakConf默认值为"[break_0]"，表示中断配置
        self.params_refine_text = {"prompt": f"{oralConf}{laughConf}{breakConf}"}

    def setInferCode(self , temperature = 0.3 , top_P = 0.7 , top_K = 20 , speed = "[speed_5]"):
        # 设置推理代码的参数
        # temperature: 控制生成文本的随机性，值越大，生成的文本越随机
        self.params_infer_code["temperature"] = temperature
        # top_P: 控制生成文本的多样性，值越大，生成的文本越多样
        self.params_infer_code["top_P"] = top_P
        # top_K: 控制生成文本的词汇量，值越大，生成的文本使用的词汇越多
        self.params_infer_code["top_K"] = top_K
        # speed: 控制生成文本的速度，这里使用了一个字符串表示速度等级
        self.params_infer_code["prompt"] = speed

    def generateSound(self , texts , savePath = "output/" , filePrefix = "output"):
        # 调用chat对象的infer方法，将文本转换为音频波形
        # texts: 要转换为音频的文本列表
        # use_decoder: 是否使用解码器
        # params_refine_text: 文本精炼参数
        # params_infer_code: 音频生成参数
        wavs = self.chat.infer(texts , use_decoder = True , params_refine_text = self.params_refine_text , params_infer_code = self.params_infer_code)
        # 初始化一个空列表，用于存储生成的音频文件路径
        wavFilePath = []
        # 遍历生成的音频波形列表
        for (index, wave) in enumerate(wavs):
            # 使用soundfile库将音频波形写入文件
            # 文件路径由savePath、filePrefix和索引组成
            # wave[0]表示音频数据，24000是采样率
            soundfile.write(f"{savePath}{filePrefix}{index}.wav" , wave[0] , 24000)
            # 将生成的音频文件路径添加到列表中
            wavFilePath.append(f"{savePath}{filePrefix}{index}.wav")
        # 返回生成的音频文件路径列表
        return wavFilePath

if __name__ == "__main__":
    chUtil = ChatTTSUtil()
    texts = [
        "大家好，我是Chat T T S，欢迎来到畅的科技工坊。",
        "太棒了，我竟然是第一位嘉宾。",
        "我是Chat T T S， 是专门为对话场景设计的文本转语音模型，例如大语言助手对话任务。我支持英文和中文两种语言。最大的模型使用了10万小时以上的中英文数据进行训练。目前在huggingface中的开源版本为4万小时训练且未S F T 的版本。",
    "耶，我们开始吧"
    ]
    chUtil.setInferCode(0.8 , 0.7 , 20 , speed = "[speed_3]")
    chUtil.generateSound(texts)
