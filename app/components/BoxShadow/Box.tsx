import React, { useState } from 'react'
// import Box, { links as boxShadow } from '~/components/BoxShadow/Box'
import boxShadow from './boxShadow.css'
import type { LinksFunction } from "@remix-run/node";
import { initialBoxShadow } from '~/constants/box-shadow-values';
import { AppProvider, Button, Form, Page, Divider, Grid, LegacyCard, Checkbox, RangeSlider, ColorPicker } from '@shopify/polaris';
import { BoxShadowI } from '~/types/index.type';
import ListItem , {links as listItem} from '~/components/ListItem/ListItem';

const Box = () => {
    const [data, setData] = useState(initialBoxShadow);
    const [rangeValue, setRangeValue] = useState(32);
  const [checked, setChecked] = useState(false);
  const [shadows, setShadows] = useState<any>([]);
  const [colorItem, setColorItem] = useState("#3d9df6");
  const [colorBg, setColorBg] = useState("#ffffff");
  const [formData, setFormData] = useState(data[0]);
  console.log("🚀 ~ file: Box.tsx:23 ~ Box ~ formData:", formData)
  const [count, setCount] = useState(data.length);
  const [editData, setEditData] = useState<any>();
  const handleColorItemChange = (e: any) => {
    setColorItem(e.target.value);
  };
  const updateShadow = (prop: string, val: any) => {
    setFormData({ ...formData, [prop]: val });
  }
  
  const handleColorBgChange = (e: any) => {
  setColorBg(e.target.value);
};



// useEffect(() => { 
//   if (editData) {
//     setFormData((prevFormData: any) => ({
//       ...prevFormData,
//       shiftRight: editData.shiftRight,
//       shiftDown: editData.shiftDown,
//       spread: editData.spread,
//       blur: editData.blur,
//       opacity: editData.opacity,
//       color: editData.color,
//       inset: editData.inset,
//       id: editData.id,
//     }));
//   }else{
//     setEditData(data[0])
//   }

// }, [editData]);

const handleAdd = () => {
  const newData: BoxShadowI = {
    id: count,
    shiftRight: 0,
    shiftDown: 19,
    spread: 3,
    blur: 7,
    opacity: 20,
    color: "#00000",
    inset: false,
  };
  setData((prevData: any) => [...prevData, newData]);
  setCount(count + 1);
};
  return (
    <AppProvider i18n={{}}>
        <div className='box'>
          <Page fullWidth>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
                <LegacyCard title="Box-Shadow CSS Generator" sectioned>
                 
                    <RangeSlider
                      label="Shift right"
                      value={formData.shiftRight}
                      id='shiftRight'
                      onChange={(e) => updateShadow("shiftRight", e)}
                      output
                      max={50}
                      min={-50}
                      step={1}
                    />
                    <RangeSlider
                      id='shiftDown'
                      label="Shift down"
                      value={formData.shiftDown}
                      onChange={(e) => updateShadow("shiftDown", e)}
                      output
                      min={-50}
                      max={50}
                      step={1}
                    />
                    <RangeSlider
                      id='spread'
                      label="Spread"
                      value={formData.spread}
                      onChange={(e) => updateShadow("spread", e)}
                      output
                      min={0}
                      max={100}
                      step={1}
                    />
                    <RangeSlider
                      label="Blur"
                      id='blur'
                      value={formData.blur}
                      onChange={(e) => updateShadow("blur", e)}
                      output
                      min={0}
                      max={100}
                      step={1}
                    />
                    <RangeSlider
                      label="Opacity"
                      id='opacity'
                      value={formData.opacity}
                      onChange={(e) => updateShadow("opacity", e)}
                      output
                      min={0}
                      max={100}
                      step={1}
                    />
                    <Checkbox
                      label="Inset"
                      id='inset'
                      checked={checked}
                      onChange={(e) => updateShadow("inset", e)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <ColorPicker  onChange={(e) => updateShadow("color", e)} color={formData.color} />
                      <Divider />
                      <div>
                        <Button onClick={handleAdd}>Add product</Button>
                      </div>
                      <div>
                        {data.map((e: any, index: number) => (
                          <ListItem data={data} setData={setData}  shadow={e} key={index} editData={editData} setEditData={setEditData}/>
                        ))}
    
                      </div>
                    </div>
               
                </LegacyCard>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, lg: 6, xl: 6 }}>
                <LegacyCard  >
                  <LegacyCard.Header title="Preview">
                    <span>
                      <input
                        type="color"
                        value={colorBg}
                        onChange={handleColorBgChange}
                      />
                      <input
                        type="color"
                        value={colorItem}
                        onChange={handleColorItemChange}
                      />
                    </span>
    
                  </LegacyCard.Header>
                  <LegacyCard.Section>
                    <div className=" " style={{ background: colorBg }}>
                      <div
                        className="box-preview "
                        style={{ boxShadow: shadows, background: colorItem }}></div>
                    </div> 
    
                  </LegacyCard.Section>
                </LegacyCard>
                <LegacyCard title='Css code'>
                  <LegacyCard.Section>
                    <p>heheh</p>
                  </LegacyCard.Section>
                </LegacyCard>
                <LegacyCard title='Template'>
                  <LegacyCard.Section>
                    <div
                    // key={e.id} onClick={() => handleTemplateChange(e.template)}
                    >
    
                    </div>
                  </LegacyCard.Section>
                </LegacyCard>
              </Grid.Cell>
            </Grid>
          </Page>
        </div>
    
      </AppProvider>
  )
}
export default Box
export const links: LinksFunction = () => {
    return [{rel:'stylesheet', href:boxShadow},...listItem()]
}