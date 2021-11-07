import numpy as np
import pandas as pd
import torch
import os
import matplotlib.pyplot as plt
import torch.nn.functional as F 
from torch import nn,optim
from torchvision import transforms as T,datasets,models
from torchvision.utils import make_grid
from torch.utils.data import DataLoader
from collections import OrderedDict
from tqdm import tqdm
import time
import copy



class resnet_18(nn.Module):
    def __init__(self):
        super().__init__()
        
        self.model = models.resnet18(pretrained=True)
        self.layer1 = nn.Sequential(*list(self.model.children())[:-2],
                                   nn.Conv2d(in_channels = 512,
                                      out_channels = 1024,
                                      kernel_size = 3,
                                      stride = 1,
                                      padding = 0),
                                   nn.BatchNorm2d(1024),
                                   nn.ReLU())
        self.layer2 = nn.Sequential(nn.Conv2d(in_channels = 1024,
                                      out_channels = 256,
                                      kernel_size = 3,
                                      stride = 1,
                                      padding = 0),
                                   nn.BatchNorm2d(256),
                                   nn.ReLU())
        # self.layer3 = nn.Sequential(nn.Conv2d(in_channels = 256,
        #                               out_channels = 64,
        #                               kernel_size = 3,
        #                               stride = 1,
        #                               padding = 0),
        #                            nn.BatchNorm2d(64),
        #                            nn.ReLU())
        # self.layer4 = nn.Sequential(nn.Conv2d(in_channels = 64,
        #                               out_channels = 5,
        #                               kernel_size = 3,
        #                               stride = 1,
        #                               padding = 0),
        #                            nn.BatchNorm2d(5),
        #                            nn.ReLU())
        self.GAP=nn.AdaptiveAvgPool2d(5)

        self.Flatten=nn.Sequential(nn.Linear(256*5*5,1000),
                                  nn.Linear(1000,2))
        


    def forward(self, x):
        # x=self.model(x)
        x=self.layer1(x)
        x=self.layer2(x)
        x=self.GAP(x)
        x=x.view(-1, 256*5*5)
        x=self.Flatten(x)

        return x

device = torch.device('cpu')

PATH="/home/dlxogns1004/react/model/Chest_model.pt"
model=resnet_18()
optimizer = torch.optim.RMSprop(model.parameters(), lr=0.0000001, weight_decay=0.001)

checkpoint=torch.load(PATH, map_location=device)
model.load_state_dict(checkpoint["model_state_dict"])
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
model.eval()

path="/home/dlxogns1004/react/execute"

data_dir = path
VAL = 'valid'
def data_transforms(phase = None):
    data_T = T.Compose([
                T.Resize(size = (224,224)),
                T.ToTensor(),
                T.Normalize([0.485, 0.456, 0.406],[0.229, 0.224, 0.225])
    ])
    return data_T

testset = datasets.ImageFolder(os.path.join(data_dir),transform = data_transforms(VAL))

def view_classify(img,ps):
    
    class_name = ['healthy', 'pneumonia']
    classes = np.array(class_name)

    ps = ps.cpu().data.numpy().squeeze()
    
    max1=max(ps)
    min1=min(ps)
    # print(len(ps))
    pps=ps
    for i in range(len(ps)):
        pps[i]=ps[i]/max1

    # img = show_image(img,get_denormalize = True)
    
    

    # fig, (ax1, ax2) = plt.subplots(figsize=(8,12), ncols=2)
    # ax1.imshow(img)
    # # ax1.set_title('Ground Truth : {}'.format(class_name[label]))
    # # ax1.axis('off')
    # ax2.barh(classes, pps)
    # ax2.set_aspect(0.1)
    # ax2.set_yticks(classes)
    # ax2.set_yticklabels(classes)
    # ax2.set_title('Predicted Class')
    # ax2.set_xlim(0,1)
    # ax2.xaxis.set_visible(False)
    # plt.tight_layout()

    return None


image,label = testset[0]
class_name = ['healthy', 'pneumonia']
ps = torch.exp(model(image.unsqueeze(0)))
view_classify(image,ps)

tmp = []
for i in ps.tolist()[0]:
    tmp.append(str(round(i / sum(ps.tolist()[0])*100, 2))+'%')

view_classify(image,ps)
for i in range(len(tmp)):
    print(str(class_name[i]) +','+ str(tmp[i]))