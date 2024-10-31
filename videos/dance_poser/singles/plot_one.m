cd '/Users/pdealcan/Documents/github/jatosTEST/study_assets_root/MMBB/videos/dance_poser/singles'
addpath('/Users/pdealcan/Documents/github/matlabTools/MocapToolbox/mocaptoolbox2')

load mcdemodata

%True = readtable("/Users/pdealcan/Documents/github/t/sliced__Capoeira_Theodoros_v2_C3D_poses.csv");
True = readtable("/Users/pdealcan/Documents/github/EDGEk/eval/eval_data/ground_truth_aist_redo/sliced_0_gWA_sBM_cAll_d25_mWA2_ch02.csv");
True = table2array(True);

%Adding to matlab object
df = dance1;
df.nFrames = height(True);
df.nMarkers = width(True)/3;
df.freq = 15;
trueD = df;
trueD.data = True;    
trueD.nMarkers=width(trueD.data)/3;
    
trueD.nFrames = height(trueD.data)
    

%Parameters for aist dataset
par = mcinitanimpar
par.msize = 8
par.output = "mp4";
par.videoformat = 'mp4'
par.conn = [1 2; 1 3; 1 4; 3 6; 2 5; 3 6; 4 7; 5 8; 6 9; 9 12; 8 11; 7 10; 10 13; 13 16; 10 14; 10 15; 14 17; 15 18; 18 20; 17 19; 20 22; 19 21; 21 23; 22 24];
par.markercolors='bbbbbbbbbbbbbbbbbbbbbbbbrr'        
par.videoformat = "mp4";

trueD = mccenter(trueD);
    
mcanimate(trueD, par)

IMUs = mcgetmarker(trueD, [25, 26]);
mctimeder(trueD, 2)
