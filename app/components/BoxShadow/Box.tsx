import React, { useEffect, useState } from 'react'
import boxShadow from './boxShadow.css'
import type { LinksFunction } from "@remix-run/node";
import { Templates, initialBoxShadow } from '~/constants/box-shadow-values';
import { AppProvider, Button, hsbToRgb, Page, Divider, Grid, LegacyCard, Checkbox, RangeSlider, ColorPicker } from '@shopify/polaris';
import { BoxShadowI } from '~/types/index.type';
import ListItem, { links as listItem } from '~/components/ListItem/ListItem';

const Box = () => {
  const [data, setData] = useState(initialBoxShadow);
  console.log("🚀 ~ file: Box.tsx:11 ~ Box ~ data:", data)
  const [shadows, setShadows] = useState<any>([]);
  const [colorItem, setColorItem] = useState("#3d9df6");
  const [colorBg, setColorBg] = useState("#ffffff");
  const [formData, setFormData] = useState(data[0]);
  const [count, setCount] = useState(data.length);
  const [editData, setEditData] = useState<any>();

  const handleTemplateChange = (e: any) => {
    setData(e);
    setEditData(e[0])
  };

  const handleColorItemChange = (e: any) => {
    setColorItem(e.target.value);
  };
  const updateShadow = (prop: string, val: any) => {
    setFormData({ ...formData, [prop]: val });
    console.log("🚀 ~ file: Box.tsx:29 ~ updateShadow ~ val:", val)
    if (editData) {
      const updatedData = data.map((item: any) => {
        if (item.id === editData.id) {
          return { ...item, ...formData };
        }
        return item;
      });
      setData(updatedData);
    }
  };

  const handleColorBgChange = (e: any) => {
    setColorBg(e.target.value);
  };

  useEffect(() => {
    const boxShadowString = data
      .map((item: any) => {
        const { shiftRight, shiftDown, blur, spread, color, inset } = item;
        const ToRgb = hsbToRgb(color)
        const colorWithOpacity = `rgba(${ToRgb.red}, ${ToRgb.green}, ${ToRgb.blue})`;
        const insetString = inset
          ? `inset ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px `
          : `${shiftRight}px ${shiftDown}px ${blur}px ${spread}px`;
        return ` ${insetString} ${colorWithOpacity} `;
      })
      .join(",");
    setShadows(boxShadowString);
  }, [data, formData]);

  useEffect(() => {
    if (editData) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        shiftRight: editData.shiftRight,
        shiftDown: editData.shiftDown,
        spread: editData.spread,
        blur: editData.blur,
        color: editData.color,
        inset: editData.inset,
        id: editData.id,
      }));
    } else {
      setEditData(data[0])
      setFormData(data[0])

    }
  }, [editData]);

  const handleAdd = () => {
    const newData: BoxShadowI = {
      id: count,
      shiftRight: 0,
      shiftDown: 19,
      spread: 3,
      blur: 7,
      color: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
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
                <Checkbox
                  label="Inset"
                  id='inset'
                  checked={formData.inset}
                  onChange={(e) => updateShadow("inset", e)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <ColorPicker onChange={(e) => updateShadow("color", e)} color={formData.color} />
                  <Divider />
                  <div>
                    <Button onClick={handleAdd}>Add product</Button>
                  </div>
                  <div className='list'>
                    {data.map((e: any, index: number) => (
                      <ListItem index={index} type='box' formData={formData} data={data} setData={setData} shadow={e} key={index} editData={editData} setEditData={setEditData} />
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
                  <div style={{ background: colorBg, padding: 36 }}>
                    <div
                      className="box-preview "
                      style={{ boxShadow: shadows, background: colorItem }}></div>
                  </div>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Css code'>
                <LegacyCard.Section>
                  <p>box-shadow: {shadows}</p>
                </LegacyCard.Section>
              </LegacyCard>
              <LegacyCard title='Template'>
                <LegacyCard.Section>
                  <div className='list-template'>
                    {Templates.map((e: any) => (
                      <div className="template" key={e.id} onClick={() => handleTemplateChange(e.template)}></div>
                    ))}
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
  return [{ rel: 'stylesheet', href: boxShadow }, ...listItem()]
}