folders=("dirtyDishesBeats" "floorplanBeats" "habstrackBeats" "honeysuckleBeats" "lettuceBeats" "softSandBeats")

for folder in ${folders[@]}; 
  do currentFile=$folder;
  echo "Processing " $folder
  cd $folder
  files=$(ls)
  for file in ${files[@]};
    do lame --preset insane ./$file
  done
  cd ..
  echo "\n"
done
